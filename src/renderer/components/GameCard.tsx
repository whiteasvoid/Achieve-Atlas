import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../api/steam';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const playtimeHours = (game.playtime_forever / 60).toFixed(1);

  return (
    <Link to={`/game/${game.appid}`} state={{ game }} className="bg-gray-800 rounded-lg overflow-hidden block hover:bg-gray-700 transition">
      <img src={game.header_image} alt={`${game.name} header`} className="w-full h-auto" />
      <div className="p-4">
        <p className="font-bold truncate">{game.name}</p>
        <p className="text-sm text-gray-400">{playtimeHours} hours played</p>
      </div>
    </Link>
  );
};

export default GameCard;