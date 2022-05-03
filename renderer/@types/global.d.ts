declare global {
  interface Window {
    myAPI: myAPI;
  }
}
export interface myAPI {
  passInfo: (list: Object) => Promise<string[]>;
}
