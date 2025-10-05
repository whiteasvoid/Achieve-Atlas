import React, { useEffect, useState } from 'react';
import Header from 'components/ui/Header';
import StatsCard from 'components/StatsCard';
import AchievementList from 'components/AchievementList';
import GameOverview from 'components/GameOverview';
import { getOwnedGames, Game } from '../api/steam';
import './Dashboard.css';

// TODO: Replace with actual data from the application's state
const almostFinishedAchievements = [
  { game: 'Cook Simulator', title: 'Master Chef', description: 'Cook 100 different recipes', progress: 87, unlocked: false },
  { game: 'Fast Runner', title: 'Speed Runner', description: 'Complete the game in under 2 hours', progress: 95, unlocked: false },
  { game: 'Adventure Quest', title: 'Treasure Hunter', description: 'Find all hidden treasures', progress: 78, unlocked: true },
];

// TODO: Replace with actual data from the application's state
const pinnedAchievements = [
  { game: 'Cook Simulator', title: 'Master Chef', description: 'Cook 100 different recipes', progress: 87, unlocked: false },
  { game: 'Adventure Quest', title: 'Treasure Hunter', description: 'Find all hidden treasures', progress: 78, unlocked: true },
  { game: 'RPS Heroes', title: 'Level 50', description: 'Reach the maximum level', progress: 100, unlocked: true },
];

const Dashboard: React.FC = () => {
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
    <div className="dashboard p-4 bg-gray-900 text-white">
      <Header />
      {/* TODO: Replace with actual data from the application's state */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        <StatsCard title="Total Achievements" value="325" icon={<span>🏆</span>} />
        <StatsCard title="Completed" value="258" icon={<span>✅</span>} />
        <StatsCard title="Games Tracked" value={loading ? '...' : games.length} icon={<span>🎮</span>} />
        <StatsCard title="Almost Finished" value="4" icon={<span>📈</span>} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AchievementList title="Almost Finished Achievements" achievements={almostFinishedAchievements} />
        <AchievementList title="Pinned Achievements" achievements={pinnedAchievements} />
      </div>
      <GameOverview games={games} loading={loading} error={error} />
    </div>
  );
}

export default Dashboard;