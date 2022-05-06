// Native
import { join } from 'path';
import { format } from 'url';

// Packages
import { BrowserWindow, app, ipcMain, dialog } from 'electron';
import isDev from 'electron-is-dev';
import prepareNext from 'electron-next';
import { Cluster } from 'puppeteer-cluster';
import puppeteer from 'puppeteer';
import { SettingListType } from '../renderer/components/settings/NewDetailSettingArea';
import { ImageInfo } from '../renderer/lib/types/ImageInfo';

app.on('ready', async () => {
  await prepareNext('./renderer');
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.js'),
    },
  });

  mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    item.setSavePath(`${app.getPath('downloads')}/${item.getFilename()}`);
    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed');
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused');
        } else {
          console.log(`Received bytes: ${item.getReceivedBytes()}`);
        }
      }
    });
    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log('Download successfully');
      } else {
        console.log(item.getSavePath());
        console.log(`Download failed: ${state}`);
      }
    });
  });

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      });

  const fullScreenCapture = async (px: number, url: string) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({
        width: px,
        height: (await page.evaluate(() => document.body.clientHeight)) + 32,
        deviceScaleFactor: 2,
      });
      const response = await page.goto(url);
      // await page.waitForTimeout(1000);

      const image = await page.screenshot({
        fullPage: true,
        // clip: {
        //   x: 0,
        //   y: 0,
        //   width: px,
        //   height: (await page.evaluate(() => document.body.clientHeight)) + 32,
        // },
      });
      await browser.close();
      return { image: image.toString('base64'), px: px.toString(), url };
    } catch (error) {
      throw error;
    }
  };

  ipcMain.handle('screenShot', async (e, args: SettingListType[number]['setting']) => {
    const { url, size } = args;
    const imageInfo: ImageInfo = [];
    try {
      const cluster: Cluster<{ px: number; url: string }> = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: size.length,
      });
      await cluster.task(async ({ page, data: { px, url } }) => {
        const result = await fullScreenCapture(px, url);
        imageInfo.push(result);
      });
      await Promise.all(
        size.map(({ px }) => {
          cluster.queue({ px: parseInt(px, 10), url: url });
        })
      );
      await cluster.idle();
      await cluster.close();
      return imageInfo;
    } catch (error) {
      throw error;
    }
  });

  mainWindow.loadURL(url);
});

app.on('window-all-closed', app.quit);
