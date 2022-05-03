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

app.on('ready', async () => {
  await prepareNext('./renderer');
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.js'),
    },
  });

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      });

  // 'openDialog' チャネルに受信
  ipcMain.handle('openDialog', async () => {
    const dirpath = await dialog
      .showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
      })
      .then((result) => {
        if (result.canceled) return;

        return result.filePaths[0];
      })
      .catch((err) => console.log(err));

    if (!dirpath) return;

    return dirpath;
  });

  const fullScreenCapture = async (px: number, url: string) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: px,
      height: (await page.evaluate(() => document.body.clientHeight)) + 32,
      deviceScaleFactor: 2,
    });
    await page.goto(url);
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
    console.log(image);

    await browser.close();
    return image.toString('base64');
  };

  ipcMain.handle('screenShot', async (e, args: SettingListType[number]['setting']) => {
    console.log(args);
    const { url, size } = args;
    const buffers: string[] = [];
    const cluster: Cluster<{ px: number; url: string }> = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: size.length,
    });
    await cluster.task(async ({ page, data: { px, url } }) => {
      const result = await fullScreenCapture(px, url);
      buffers.push(result);
    });
    await Promise.all(
      size.map(({ px }) => {
        cluster.queue({ px: parseInt(px, 10), url: url });
      })
    );
    await cluster.idle();
    await cluster.close();
    return buffers;
  });

  mainWindow.loadURL(url);
});

app.on('window-all-closed', app.quit);
