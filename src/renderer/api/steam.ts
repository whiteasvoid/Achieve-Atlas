// Define the structure of a Game object returned by the Steam API
export interface Game {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  img_logo_url: string;
}

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