/// <reference types="vite/client" />

// Define the shape of the API that will be exposed from the main process
export interface IElectronAPI {
  getOwnedGames: () => Promise<any[]>;
}

// Extend the global Window object with our new API
declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}