export interface Game {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  img_logo_url: string;
  completedAchievements?: number;
  totalAchievements?: number;
}

/**
 * Fetches the list of games owned by the authenticated Steam user via Electron IPC.
 * 
 * This frontend wrapper calls the backend's `getOwnedGames` function (which uses Steam API endpoint `/IPlayerService/GetOwnedGames/v1/`).
 * Logs the full response to the console for debugging (as per development needs).
 * 
 * @returns Promise<Game[]> - Array of owned games, including basic app info and optional achievement stats.
 * @throws Error - If the IPC call fails (e.g., network error in backend or missing env vars).
 */
export const getOwnedGames = async (): Promise<Game[]> => {
  try {
    const games = await window.electronAPI.getOwnedGames();
    // Log the full JSON response in the developer tools console, as requested
    console.log('Steam API Response:', JSON.stringify(games, null, 2));
    return games;
  } catch (error) {
    console.error('Failed to fetch owned games via IPC:', error);
    throw error;
  }
};

/**
 * Fetches the achievements earned by the player for a specific game via Electron IPC.
 * 
 * This frontend wrapper calls the backend's `getPlayerAchievements` function (which uses Steam API endpoint `/ISteamUserStats/GetPlayerAchievements/v1/`).
 * Returns only completed achievements (filtered by `achieved === 1` in backend).
 * 
 * @param appid - The Steam App ID of the game.
 * @returns Promise<Achievement[]> - Array of completed achievements (e.g., `{ name, achieved, unlocktime }`).
 *   Note: Typed as `any[]` in code; recommend defining `interface Achievement { name: string; achieved: number; unlocktime?: number; }` for type safety.
 * @throws Error - If the IPC call fails (e.g., private profile or game without achievements).
 */
export const getPlayerAchievements = async (appid: number): Promise<any[]> => {
  try {
    const achievements = await window.electronAPI.getPlayerAchievements(appid);
    return achievements;
  } catch (error) {
    console.error(`Failed to fetch player achievements for appid ${appid} via IPC:`, error);
    throw error;
  }
};

/**
 * Fetches the full schema (list) of available achievements for a specific game via Electron IPC.
 * 
 * This frontend wrapper calls the backend's `getSchemaForGame` function (which uses Steam API endpoint `/ISteamUserStats/GetSchemaForGame/v2/`).
 * Returns all possible achievements for the game, regardless of completion status.
 * 
 * @param appid - The Steam App ID of the game.
 * @returns Promise<AchievementSchema[]> - Array of achievement schemas (e.g., `{ name, displayName, description, icon }`).
 *   Note: Typed as `any[]` in code; recommend defining `interface AchievementSchema { name: string; displayName: string; description: string; icon: string; }` for type safety.
 * @throws Error - If the IPC call fails (e.g., game without stats).
 */
export const getSchemaForGame = async (appid: number): Promise<any[]> => {
  try {
    const schema = await window.electronAPI.getSchemaForGame(appid);
    return schema;
  } catch (error) {
    console.error(`Failed to fetch game schema for appid ${appid} via IPC:`, error);
    throw error;
  }
};