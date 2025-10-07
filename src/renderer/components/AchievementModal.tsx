import React from 'react';
import { DetailedAchievement } from '../api/steam';

interface AchievementModalProps {
  achievement: DetailedAchievement | null;
  onClose: () => void;
}

const AchievementModal: React.FC<AchievementModalProps> = ({ achievement, onClose }) => {
  if (!achievement) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{achievement.displayName}</h2>
          <button onClick={onClose} className="text-white">&times;</button>
        </div>
        <div className="flex items-center">
          <img src={achievement.icon} alt={achievement.displayName} className="w-16 h-16 mr-4" />
          <div>
            <p>{achievement.description || 'No description available.'}</p>
            {achievement.achieved && (
              <p className="text-sm text-gray-400">
                Unlocked: {new Date(achievement.unlocktime * 1000).toLocaleString()}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold">Global Completion Rate</h3>
          <p className="text-lg">{achievement.percent != null ? `${Number(achievement.percent).toFixed(2)}%` : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default AchievementModal;