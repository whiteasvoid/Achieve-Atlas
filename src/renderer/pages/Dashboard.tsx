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
  const [showCompletedGames, setShowCompletedGames] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ownedGames, pinned] = await Promise.all([
          getOwnedGames(),
          window.electronAPI.user.getPinnedAchievements(),
        ]);
        const filteredGames = ownedGames.filter(
          (game) => game.playtime_forever > 0 && game.totalAchievements > 0
        );
        setGames(filteredGames);
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


  const totalAchievements = games.reduce((acc, game) => acc + game.totalAchievements, 0);
  const completedAchievements = games.reduce((acc, game) => acc + game.unlockedAchievements, 0);


  const handleUnpin = async (achievement: DetailedAchievement) => {
    if (!achievement.appid) {
      console.error('Cannot unpin achievement without an appid.');
      return;
    }
    try {
      await window.electronAPI.user.unpinAchievement(achievement.name, achievement.appid);
      setPinnedAchievements((prev) =>
        prev.filter((a) => !(a.name === achievement.name && a.appid === achievement.appid))
      );
    } catch (err) {
      console.error('Failed to unpin achievement:', err);
    }
  };

  return (
    <div className="dashboard p-4 bg-gray-900 text-white">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        <StatsCard title="Total Achievements" value={loading ? '...' : totalAchievements.toLocaleString()} icon={<span>🏆</span>} />
        <StatsCard title="Completed" value={loading ? '...' : completedAchievements.toLocaleString()} icon={<span>✅</span>} />
        <StatsCard title="Games Tracked" value={loading ? '...' : games.length} icon={<span>🎮</span>} />
        <StatsCard title="Pinned" value={pinnedAchievements.length} icon={<span>📌</span>} />
      </div>
      <div className="mt-4">
        <AchievementList
          title="Pinned Achievements"
          achievements={pinnedAchievements}
          onUnpin={handleUnpin}
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-xl font-bold">Games</h2>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showCompletedGames"
            checked={showCompletedGames}
            onChange={(e) => setShowCompletedGames(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="showCompletedGames">Show Completed Games</label>
        </div>
      </div>
      <GameOverview
        games={games.filter(
          (game) => showCompletedGames || game.unlockedAchievements !== game.totalAchievements
        )}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default Dashboard;