import React from 'react';
import { Game } from '../api/steam';
import GameCard from './GameCard';

interface GameOverviewProps {
  games: Game[];
  loading: boolean;
  error: string | null;
}

const GameOverview: React.FC<GameOverviewProps> = ({ games, loading, error }) => {
  if (loading) return <p className="text-center mt-4">Loading games...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">Error loading games: {error}</p>;

  return (
    <div className="bg-gray-900 p-4 rounded-lg mt-4">
      <h3 className="text-xl font-bold mb-4">Games Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <GameCard key={game.appid} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameOverview;