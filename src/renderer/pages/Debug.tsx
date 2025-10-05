import React, { useEffect, useState } from 'react';
import { getOwnedGames, Game } from '../api/steam';
import './Debug.css';

const Debug: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const ownedGames = await getOwnedGames();
        setGames(ownedGames);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="debug-container">
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>
      <p>This page is used for testing Steam API calls.</p>
      <div className="mt-4 p-4 bg-gray-800 rounded">
        <h2 className="text-xl font-bold">Owned Games</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <ul className="list-disc list-inside mt-2">
            {games.map((game) => (
              <li key={game.appid}>{game.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Debug;