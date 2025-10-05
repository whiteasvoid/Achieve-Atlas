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
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          title={isPinned ? 'Unpin Achievement' : 'Pin Achievement'}
        >
          <PinIcon isPinned={isPinned} />
        </button>
      )}
    </div>
  );
};

const PinIcon: React.FC<{ isPinned?: boolean }> = ({ isPinned }) => {
  if (isPinned) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"
      />
    </svg>
  );
};

export default AchievementCard;