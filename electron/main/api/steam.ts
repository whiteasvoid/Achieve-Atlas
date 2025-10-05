import axios from 'axios';

const STEAM_API_BASE_URL = 'https://api.steampowered.com';

export async function getOwnedGames() {
  const apiKey = process.env.STEAM_KEY;
  const steamId = process.env.STEAM_ID;

  if (!apiKey || !steamId) {
    throw new Error('Missing Steam API key or Steam ID in environment variables.');
  }

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