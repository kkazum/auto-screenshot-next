export const asyncLocalStorage = {
  setItem: (key: string, value: any) => {
    return Promise.resolve().then(() => {
      return localStorage.setItem(key, value);
    });
  },
  getItem: (key: string) => {
    return Promise.resolve().then(() => {
      return localStorage.getItem(key);
    });
  },
};
