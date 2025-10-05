import React from 'react';
import { Link } from 'react-router-dom';
import './MainMenu.css';

function MainMenu() {
  return (
    <div className="main-menu-container">
      <h1 className="main-menu-title">Achieve Atlas</h1>
      <p className="main-menu-subtitle">Your Steam Achievement Tracker</p>
      <Link to="/dashboard" className="start-tracking-button">
        Start Tracking
      </Link>
      <Link to="/debug" className="debug-link">
        Debug
      </Link>
    </div>
  );
}

export default MainMenu;