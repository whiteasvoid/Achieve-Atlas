import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <p className="text-gray-400">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;