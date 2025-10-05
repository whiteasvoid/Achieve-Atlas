import React from 'react';
import AchievementCard from './AchievementCard';
import { DetailedAchievement } from '../api/steam';

interface AchievementListProps {
  title: string;
  achievements: DetailedAchievement[];
}

const AchievementList: React.FC<AchievementListProps> = ({ title, achievements }) => {
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
          // The AchievementCard is now flexible enough to be used directly.
          // The pin button will not be displayed as onPinToggle is not provided.
          <AchievementCard key={ach.name || index} achievement={ach} />
        ))}
      </div>
    </div>
  );
};

export default AchievementList;