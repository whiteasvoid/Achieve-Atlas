import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainMenu from '@/renderer/pages/MainMenu';
import Dashboard from '@/renderer/pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainMenu/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  );
}

export default App;