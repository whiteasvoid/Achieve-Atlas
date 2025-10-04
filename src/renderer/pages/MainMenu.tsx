import React from 'react';
import './MainMenu.css';

function MainMenu() {
  return (
    <div className="main-menu-container">
      <h1 className="main-menu-title">AchieveAtlas</h1>
      <p className="main-menu-subtitle">Your Steam Achievement Tracker</p>
      <button className="start-tracking-button">
        Start Tracking
      </button>
    </div>
  );
}

export default MainMenu;