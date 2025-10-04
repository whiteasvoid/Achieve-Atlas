import React from 'react';

interface AchievementCardProps {
  game: string;
  title: string;
  description: string;
  progress: number;
  unlocked: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ game, title, description, progress, unlocked }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400">{game}</p>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
        <div className={`text-2xl ${unlocked ? 'text-green-500' : 'text-gray-500'}`}>
          {unlocked ? '🔓' : '🔒'}
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-right text-sm mt-1">{progress}%</p>
      </div>
    </div>
  );
};

export default AchievementCard;