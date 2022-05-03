/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ipcRenderer, IpcRenderer, contextBridge } from 'electron';
import { SettingListType } from '../renderer/components/settings/NewDetailSettingArea';

type Setting = SettingListType[number]['setting'];
declare global {
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer;
    }
  }
}
// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once('loaded', () => {
  global.ipcRenderer = ipcRenderer;
});
contextBridge.exposeInMainWorld('myAPI', {
  passInfo: async (list: Setting): Promise<string[]> => await ipcRenderer.invoke('screenShot', list),
});

// contextBridge.exposeInMainWorld('myDir', {
//   openDialog: async (): Promise<void | string> => await ipcRenderer.invoke('openDialog'),
// });
