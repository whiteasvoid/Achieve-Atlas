import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MainMenu.css';

function MainMenu() {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [steamIdInput, setSteamIdInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStartTracking = async () => {
    setIsLoading(true);
    setError('');

    let steamId = await window.electronAPI.user.getSteamId();

    if (!steamId) {
      setShowInput(true);
      setIsLoading(false);
      return;
    }

    if (steamId) {
      navigate('/dashboard');
    }
  };

  const handleSubmitSteamId = async () => {
    if (!steamIdInput.trim()) {
      setError('Please enter a valid 64-bit Steam ID.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await window.electronAPI.user.setSteamId(steamIdInput.trim());
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to save Steam ID. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowInput(false);
    setSteamIdInput('');
    setError('');
  };

  return (
    <div className="main-menu-container">
      <h1 className="main-menu-title">Achieve Atlas</h1>
      <p className="main-menu-subtitle">Your Steam Achievement Tracker</p>
      <button 
        onClick={handleStartTracking} 
        className="start-tracking-button"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Start Tracking'}
      </button>

      {showInput && (
        <div className="steam-id-input-overlay">
          <div className="steam-id-input-modal">
            <h2>Enter Your Steam ID</h2>
            <p className="steam-id-help">
              Please provide your 64-bit Steam ID (e.g., 76561197960265728). You can find it in your Steam profile URL.
            </p>
            <input
              type="text"
              value={steamIdInput}
              onChange={(e) => setSteamIdInput(e.target.value)}
              placeholder="Enter 64-bit Steam ID"
              className="steam-id-input"
              disabled={isLoading}
            />
            {error && <p className="error-message">{error}</p>}
            <div className="modal-buttons">
              <button 
                onClick={handleSubmitSteamId} 
                disabled={!steamIdInput.trim() || isLoading}
                className="submit-button"
              >
                {isLoading ? 'Saving...' : 'Save & Continue'}
              </button>
              <button onClick={handleCancel} className="cancel-button" disabled={isLoading}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Link to="/debug" className="debug-link">
        Debug
      </Link>
    </div>
  );
}

export default MainMenu;