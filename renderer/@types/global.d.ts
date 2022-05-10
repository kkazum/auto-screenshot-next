declare global {
  interface Window {
    myAPI: myAPI;
  }
}
export interface myAPI {
  passInfo: (
    list: { name: string; url: string; size: Array<{ px: string }> } | undefined
  ) => Promise<{ image: string; px: string; url: string }[]>;
}
