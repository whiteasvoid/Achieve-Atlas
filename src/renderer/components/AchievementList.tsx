import React from 'react';
import AchievementCard from './AchievementCard';

interface Achievement {
  game: string;
  title: string;
  description: string;
  progress: number;
  unlocked: boolean;
}

interface AchievementListProps {
  title: string;
  achievements: Achievement[];
}

const AchievementList: React.FC<AchievementListProps> = ({ title, achievements }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-1 gap-4">
        {achievements.map((ach, index) => (
          <AchievementCard key={index} {...ach} />
        ))}
      </div>
    </div>
  );
};

export default AchievementList;