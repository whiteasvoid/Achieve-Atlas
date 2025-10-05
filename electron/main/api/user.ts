import { app } from 'electron';
import fs from 'fs';
import path from 'path';

const userDataPath = app.getPath('userData');
const steamIdFilePath = path.join(userDataPath, 'steamId.json');

interface SteamIdData {
  steamId: string;
}

export function getSteamId(): string | null {
  try {
    if (fs.existsSync(steamIdFilePath)) {
      const dataBuffer = fs.readFileSync(steamIdFilePath);
      const data: SteamIdData = JSON.parse(dataBuffer.toString());
      return data.steamId;
    }
  } catch (error) {
    console.error('Failed to read SteamID:', error);
  }
  return null;
}

export function setSteamId(steamId: string): void {
  try {
    const data: SteamIdData = { steamId };
    fs.writeFileSync(steamIdFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Failed to save SteamID:', error);
  }
}