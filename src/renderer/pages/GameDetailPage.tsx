import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getGameDetails, DetailedAchievement, Game, getGlobalAchievementPercentages } from '../api/steam';
import AchievementCard from 'components/AchievementCard';
import AchievementModal from 'components/AchievementModal';
import './GameDetailPage.css';

// Add isPinned to the DetailedAchievement interface for local state management
interface AchievementWithPinStatus extends DetailedAchievement {
  isPinned: boolean;
}

const GameDetailPage: React.FC = () => {
  const { appid } = useParams<{ appid: string }>();
  const location = useLocation();
  const [game, setGame] = useState<Game | null>(location.state?.game || null);
  const [achievements, setAchievements] = useState<AchievementWithPinStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const [selectedAchievement, setSelectedAchievement] = useState<DetailedAchievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [globalPercentages, setGlobalPercentages] = useState<any[]>([]);

  useEffect(() => {
    const fetchGameData = async () => {
      if (!appid) {
        setError('No App ID provided.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const numericAppId = parseInt(appid, 10);

        const [gameAchievements, pinned, percentages] = await Promise.all([
          getGameDetails(numericAppId),
          window.electronAPI.user.getPinnedAchievements(),
          getGlobalAchievementPercentages(numericAppId),
        ]);

        const pinnedSet = new Set(pinned.map(p => `${p.appid}-${p.name}`));

        const achievementsWithStatus = gameAchievements.map(ach => ({
          ...ach,
          isPinned: pinnedSet.has(`${numericAppId}-${ach.name}`),
        }));

        setAchievements(achievementsWithStatus);
        setGlobalPercentages(percentages);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [appid]);

  const handlePinToggle = async (achievement: DetailedAchievement) => {
    const achievementInState = achievements.find(a => a.name === achievement.name);
    if (!achievementInState) return;

    const isCurrentlyPinned = achievementInState.isPinned;

    const fullAchievementDetails = {
      ...achievement,
      appid: game?.appid,
      gameName: game?.name,
    };

    if (isCurrentlyPinned) {
      await window.electronAPI.user.unpinAchievement(achievement.name, parseInt(appid!, 10));
    } else {
      await window.electronAPI.user.pinAchievement(fullAchievementDetails);
    }

    // Update the local state to reflect the change immediately
    setAchievements(prev =>
      prev.map(ach =>
        ach.name === achievement.name ? { ...ach, isPinned: !isCurrentlyPinned } : ach
      )
    );
  };

  const handleAchievementClick = (achievement: DetailedAchievement) => {
    const percentage = globalPercentages.find(p => p.name === achievement.name);
    setSelectedAchievement({ ...achievement, percent: percentage?.percent });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAchievement(null);
  };

  if (loading) {
    return (
      <div className="game-detail-page bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p className="text-xl animate-pulse">Loading game details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  if (!game) {
    return <div className="text-center p-8">Game not found.</div>;
  }

  return (
    <div className="game-detail-page bg-gray-900 text-white min-h-screen">
      <header className="relative">
        <img src={game.header_image} alt={`${game.name} header`} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-4">
          <h1 className="text-4xl font-bold">{game.name}</h1>
        </div>
        <Link to="/dashboard" className="absolute top-4 left-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          &larr; Back to Dashboard
        </Link>
      </header>
      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Achievements</h2>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showCompleted"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showCompleted">Show Completed</label>
          </div>
        </div>
        <div className="achievements-grid">
          {achievements.length > 0 ? (
            achievements
              .filter(ach => showCompleted || !ach.achieved)
              .map(ach => (
                <div key={ach.name} onClick={() => handleAchievementClick(ach)}>
                  <AchievementCard
                    achievement={ach}
                    isPinned={ach.isPinned}
                    onPinToggle={handlePinToggle}
                  />
                </div>
              ))
          ) : (
            <p>No achievements found for this game.</p>
          )}
        </div>
      </main>
      {isModalOpen && (
        <AchievementModal
          achievement={selectedAchievement}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default GameDetailPage;