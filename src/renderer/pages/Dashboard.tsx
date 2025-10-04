import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Dashboard</h2>
      <div className="dashboard-section">
        <h3>Almost Finished Achievements</h3>
        <p>Your nearly completed achievements will appear here.</p>
      </div>
      <div className="dashboard-section">
        <h3>Pinned Achievements</h3>
        <p>Your pinned achievements will be displayed here.</p>
      </div>
      <div className="dashboard-section">
        <h3>Games Overview</h3>
        <p>An overview of your achievement progress in various games.</p>
      </div>
    </div>
  );
}

export default Dashboard;