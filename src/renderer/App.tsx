import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainMenu from '@/renderer/pages/MainMenu';
import Dashboard from '@/renderer/pages/Dashboard';
import Debug from '@/renderer/pages/Debug';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainMenu/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/debug" element={<Debug/>} />
    </Routes>
  );
}

export default App;