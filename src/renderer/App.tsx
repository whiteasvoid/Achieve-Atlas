import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainMenu from 'pages/MainMenu';
import Dashboard from 'pages/Dashboard';
import Debug from 'pages/Debug';
import GameDetailPage from 'pages/GameDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/debug" element={<Debug />} />
      <Route path="/game/:appid" element={<GameDetailPage />} />
    </Routes>
  );
}

export default App;