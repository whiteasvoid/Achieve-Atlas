import React, { useState } from 'react';
import './SteamIDModal.css';

interface SteamIDModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (steamId: string) => void;
}

const SteamIDModal: React.FC<SteamIDModalProps> = ({ show, onClose, onSave }) => {
  const [steamId, setSteamId] = useState('');

  if (!show) {
    return null;
  }

  const handleSave = () => {
    onSave(steamId);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Change SteamID</h2>
        <input
          type="text"
          value={steamId}
          onChange={(e) => setSteamId(e.target.value)}
          placeholder="Enter new SteamID"
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default SteamIDModal;