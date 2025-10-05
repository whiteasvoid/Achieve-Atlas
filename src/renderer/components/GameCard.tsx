import React from 'react';
import { Game } from '../api/steam';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const playtimeHours = (game.playtime_forever / 60).toFixed(1);
  const iconUrl = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center">
      <img src={iconUrl} alt={`${game.name} icon`} className="w-16 h-16 mr-4" />
      <div>
        <p className="font-bold">{game.name}</p>
        <p className="text-sm text-gray-400">{playtimeHours} hours played</p>
      </div>
    </div>
  );
};

export default GameCard;