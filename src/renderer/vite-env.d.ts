/// <reference types="vite/client" />

// Define the shape of the API that will be exposed from the main process
export interface IElectronAPI {
  getOwnedGames: () => Promise<any[]>;
  getPlayerAchievements: (appid: number) => Promise<any>;
  getSchemaForGame: (appid: number) => Promise<any>;
  user: {
    getSteamId: () => Promise<string | null>;
    setSteamId: (steamId: string) => Promise<void>;
  };
}

// Extend the global Window object with our new API
declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}