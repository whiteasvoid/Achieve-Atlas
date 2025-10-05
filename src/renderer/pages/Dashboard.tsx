import React, { useEffect, useState } from 'react';
import Header from 'components/ui/Header';
import StatsCard from 'components/StatsCard';
import AchievementList from 'components/AchievementList';
import GameOverview from 'components/GameOverview';
import { getOwnedGames, Game, DetailedAchievement } from '../api/steam';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [pinnedAchievements, setPinnedAchievements] = useState<DetailedAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ownedGames, pinned] = await Promise.all([
          getOwnedGames(),
          window.electronAPI.user.getPinnedAchievements(),
        ]);
        setGames(ownedGames);
        setPinnedAchievements(pinned);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="dashboard p-4 bg-gray-900 text-white">
      <Header />
      {/* TODO: Replace with actual data from the application's state */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        <StatsCard title="Total Achievements" value="325" icon={<span>🏆</span>} />
        <StatsCard title="Completed" value="258" icon={<span>✅</span>} />
        <StatsCard title="Games Tracked" value={loading ? '...' : games.length} icon={<span>🎮</span>} />
        <StatsCard title="Pinned" value={pinnedAchievements.length} icon={<span>📌</span>} />
      </div>
      <div className="mt-4">
        <AchievementList title="Pinned Achievements" achievements={pinnedAchievements} />
      </div>
      <GameOverview games={games} loading={loading} error={error} />
    </div>
  );
}

export default Dashboard;