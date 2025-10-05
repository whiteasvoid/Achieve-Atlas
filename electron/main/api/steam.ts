import axios from 'axios';

const STEAM_API_BASE_URL = 'https://api.steampowered.com';

/**
 * Fetches the list of games owned by the authenticated Steam user.
 *
 * Endpoint: `/IPlayerService/GetOwnedGames/v1/`
 * - Official Steam API method: IPlayerService::GetOwnedGames
 * - Description: Retrieves a list of owned games for the specified Steam ID, including basic app info (name, playtime, etc.) if `include_appinfo` is true.
 * - Required params:
 *   - `key`: Steam Web API key (from environment: STEAM_KEY).
 *   - `steamid`: 64-bit Steam ID of the user (from environment: STEAM_ID).
 *   - `format`: Response format (set to 'json').
 *   - `include_appinfo`: Includes detailed app info like game name and playtime (set to 'true').
 * - Expected response: `{ response: { games: [...] } }` where `games` is an array of game objects.
 * - Errors: Throws if API key or Steam ID is missing; handles unexpected responses or network errors.
 * @returns Promise<Game[]> - Array of owned games.
 */
export async function getOwnedGames() {
  const apiKey = process.env.STEAM_KEY;
  const steamId = process.env.STEAM_ID;

  if (!apiKey || !steamId) {
    throw new Error('Missing Steam API key or Steam ID in environment variables.');
  }

  // Construct endpoint with query params for owned games retrieval
  const endpoint = '/IPlayerService/GetOwnedGames/v1/';
  const params = new URLSearchParams({
    key: apiKey,
    steamid: steamId,
    format: 'json',
    include_appinfo: 'true',
  });

  const requestUrl = `${STEAM_API_BASE_URL}${endpoint}?${params}`;

  try {
    const response = await axios.get(requestUrl);

    if (response.data && response.data.response && response.data.response.games) {
      return response.data.response.games;
    }

    // Handle cases where the API returns a successful status code but an empty or unexpected response
    console.error('Unexpected API response structure:', response.data);
    throw new Error('Unexpected API response structure.');
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';
    if (axios.isAxiosError(error)) {
      // The error is an Axios error, so we can safely access its response property
      errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
    } else if (error instanceof Error) {
      // The error is a standard Error object
      errorMessage = error.message;
    }
    console.error('Failed to fetch owned games in main process:', errorMessage);
    throw new Error(`Failed to fetch owned games: ${errorMessage}`);
  }
}

/**
 * Fetches the achievements earned by the player for a specific game.
 *
 * Endpoint: `/ISteamUserStats/GetPlayerAchievements/v1/`
 * - Official Steam API method: ISteamUserStats::GetPlayerAchievements
 * - Description: Retrieves the list of achievements unlocked by the specified user for a given game (by appid). Only includes achieved achievements (filtered by `achieved === 1`).
 * - Required params:
 *   - `key`: Steam Web API key (from environment: STEAM_KEY).
 *   - `steamid`: 64-bit Steam ID of the user (from environment: STEAM_ID).
 *   - `appid`: Steam App ID of the game (numeric input).
 *   - `format`: Response format (set to 'json').
 * - Expected response: `{ playerstats: { achievements: [...] } }` where `achievements` is an array of achievement objects (e.g., `{ name, achieved, unlocktime }`).
 * - Notes: Returns empty array if no achievements or API failure (e.g., private profile or game without achievements); does not throw on partial failures to avoid breaking the full game list.
 * @param appid - The Steam App ID of the game.
 * @returns Promise<Achievement[]> - Array of completed achievements for the game.
 */
export async function getPlayerAchievements(appid: number) {
  const apiKey = process.env.STEAM_KEY;
  const steamId = process.env.STEAM_ID;

  if (!apiKey || !steamId) {
    throw new Error('Missing Steam API key or Steam ID in environment variables.');
  }

  // Construct endpoint with query params for player achievements retrieval
  const endpoint = '/ISteamUserStats/GetPlayerAchievements/v1/';
  const params = new URLSearchParams({
    key: apiKey,
    steamid: steamId,
    appid: appid.toString(),
    format: 'json'
  });

  const requestUrl = `${STEAM_API_BASE_URL}${endpoint}?${params}`;

  try {
    const response = await axios.get(requestUrl);

    if (response.data && response.data.playerstats && response.data.playerstats.achievements) {
      // Filter for achievements that have been achieved
      const completed = response.data.playerstats.achievements.filter((ach: any) => ach.achieved === 1);
      return completed;
    }

    if (response.data && response.data.playerstats && response.data.playerstats.success === false) {
      return []; // No achievements for this game or user
    }

    console.error('Unexpected API response structure for getPlayerAchievements:', response.data);
    throw new Error('Unexpected API response structure for getPlayerAchievements.');
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(`Failed to fetch player achievements for appid ${appid}:`, errorMessage);
    // Instead of throwing, return an empty array to not break the entire game list
    return [];
  }
}

/**
 * Fetches the full schema (list) of available achievements for a specific game.
 *
 * Endpoint: `/ISteamUserStats/GetSchemaForGame/v2/`
 * - Official Steam API method: ISteamUserStats::GetSchemaForGame
 * - Description: Retrieves the complete achievement schema for a game (by appid), including all possible achievements (names, descriptions, icons) regardless of whether they've been unlocked.
 * - Required params:
 *   - `key`: Steam Web API key (from environment: STEAM_KEY).
 *   - `appid`: Steam App ID of the game (numeric input).
 *   - `format`: Response format (set to 'json').
 * - Expected response: `{ game: { availableGameStats: { achievements: [...] } } }` where `achievements` is an array of schema objects (e.g., `{ name, displayName, description, icon }`).
 * - Notes: Does not require Steam ID (public endpoint); returns empty array if no achievements or API failure (e.g., game without stats); does not throw on partial failures.
 * @param appid - The Steam App ID of the game.
 * @returns Promise<AchievementSchema[]> - Array of all available achievement schemas for the game.
 */
export async function getSchemaForGame(appid: number) {
  const apiKey = process.env.STEAM_KEY;

  if (!apiKey) {
    throw new Error('Missing Steam API key in environment variables.');
  }

  // Construct endpoint with query params for game schema retrieval
  const endpoint = '/ISteamUserStats/GetSchemaForGame/v2/';
  const params = new URLSearchParams({
    key: apiKey,
    appid: appid.toString(),
    format: 'json'
  });

  const requestUrl = `${STEAM_API_BASE_URL}${endpoint}?${params}`;

  try {
    const response = await axios.get(requestUrl);

    if (
      response.data &&
      response.data.game &&
      response.data.game.availableGameStats &&
      response.data.game.availableGameStats.achievements
    ) {
      return response.data.game.availableGameStats.achievements;
    }

    if (response.data && response.data.game && !response.data.game.availableGameStats) {
      return []; // No achievements for this game
    }

    console.error('Unexpected API response structure for getSchemaForGame:', response.data);
    throw new Error('Unexpected API response structure for getSchemaForGame.');
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(`Failed to fetch game schema for appid ${appid}:`, errorMessage);
    // Instead of throwing, return an empty array
    return [];
  }
}