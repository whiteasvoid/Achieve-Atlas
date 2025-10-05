import React from 'react';
import { DetailedAchievement } from '../api/steam';
import './AchievementCard.css';

interface AchievementCardProps {
  achievement: DetailedAchievement;
  isPinned?: boolean;
  onPinToggle?: (achievement: DetailedAchievement) => void;
  // Add gameName to the achievement object if it's not already there
  gameName?: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, isPinned, onPinToggle }) => {
  const isUnlocked = achievement.achieved;

  const handlePinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPinToggle) {
      onPinToggle(achievement);
    }
  };

  return (
    <div className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'} bg-gray-800 p-4 rounded-lg flex items-start relative`}>
      <img
        src={isUnlocked ? achievement.icon : achievement.icongray}
        alt={achievement.displayName}
        className="w-16 h-16 mr-4"
      />
      <div className="flex-1">
        <h3 className="font-bold text-lg">{achievement.displayName}</h3>
        {achievement.gameName && <p className="text-sm text-gray-500">{achievement.gameName}</p>}
        <p className="text-sm text-gray-400 mt-1">{achievement.description || 'No description available.'}</p>
        {isUnlocked && achievement.unlocktime > 0 && (
          <p className="text-xs text-green-400 mt-1">
            Unlocked: {new Date(achievement.unlocktime * 1000).toLocaleString()}
          </p>
        )}
      </div>
      {onPinToggle && (
        <button
          onClick={handlePinClick}
          className={`absolute top-2 right-2 text-2xl ${isPinned ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'}`}
          title={isPinned ? 'Unpin Achievement' : 'Pin Achievement'}
        >
          {isPinned ? '★' : '☆'}
        </button>
      )}
    </div>
  );
};

export default AchievementCard;