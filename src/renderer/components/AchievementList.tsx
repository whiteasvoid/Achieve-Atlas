import React from 'react';
import AchievementCard from './AchievementCard';
import { DetailedAchievement } from '../api/steam';

interface AchievementListProps {
  title: string;
  achievements: DetailedAchievement[];
  onUnpin?: (achievement: DetailedAchievement) => void;
}

const AchievementList: React.FC<AchievementListProps> = ({ title, achievements, onUnpin }) => {
  if (!achievements || achievements.length === 0) {
    return (
      <div className="bg-gray-900 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-gray-400">No achievements to display.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-1 gap-4">
        {achievements.map((ach, index) => (
          <AchievementCard
            key={ach.name || index}
            achievement={ach}
            isPinned={true}
            onPinToggle={onUnpin}
          />
        ))}
      </div>
    </div>
  );
};

export default AchievementList;