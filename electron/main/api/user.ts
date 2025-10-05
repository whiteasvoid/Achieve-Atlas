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

const pinnedAchievementsFilePath = path.join(userDataPath, 'pinned_achievements.json');

// Helper to read pinned achievements from the file
function readPinnedAchievementsFile(): any[] {
  try {
    if (fs.existsSync(pinnedAchievementsFilePath)) {
      const dataBuffer = fs.readFileSync(pinnedAchievementsFilePath);
      return JSON.parse(dataBuffer.toString());
    }
  } catch (error) {
    console.error('Failed to read pinned achievements:', error);
  }
  return [];
}

// Helper to write pinned achievements to the file
function writePinnedAchievementsFile(achievements: any[]): void {
  try {
    fs.writeFileSync(pinnedAchievementsFilePath, JSON.stringify(achievements, null, 2));
  } catch (error) {
    console.error('Failed to write pinned achievements:', error);
  }
}

export function getPinnedAchievements(): any[] {
  return readPinnedAchievementsFile();
}

export function pinAchievement(achievement: any): void {
  const achievements = readPinnedAchievementsFile();
  // Avoid duplicates
  if (!achievements.some(a => a.name === achievement.name && a.appid === achievement.appid)) {
    achievements.push(achievement);
    writePinnedAchievementsFile(achievements);
  }
}

export function unpinAchievement(achievementName: string, appid: number): void {
  let achievements = readPinnedAchievementsFile();
  achievements = achievements.filter(a => !(a.name === achievementName && a.appid === appid));
  writePinnedAchievementsFile(achievements);
}