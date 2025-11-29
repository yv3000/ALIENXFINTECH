
import React, { useState } from 'react';

interface Props {
  onSave: (key: string) => void;
}

export const ApiKeyModal: React.FC<Props> = ({ onSave }) => {
  const [key, setKey] = useState('');

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-alien-800 border border-alien-500 rounded-lg p-6 max-w-md w-full shadow-[0_0_20px_rgba(0,255,157,0.2)]">
        <h2 className="text-xl font-bold text-alien-500 mb-4 font-mono">
          <span className="animate-pulse">_</span>SYSTEM_ACCESS_REQUIRED
        </h2>
        <p className="text-gray-300 mb-4 text-sm">
          To initialize the ALIENX Neural Core, a Gemini API key is required.
          (Hackathon Mode: Uses Gemini Flash Free Tier)
        </p>
        <input
          type="password"
          placeholder="Paste API Key here..."
          className="w-full bg-alien-900 border border-alien-700 rounded p-3 text-white focus:border-alien-500 outline-none mb-4 font-mono"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button
          onClick={() => onSave(key)}
          disabled={!key}
          className="w-full bg-alien-500 hover:bg-alien-400 text-alien-900 font-bold py-3 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          INITIALIZE_SYSTEM
        </button>
        <p className="mt-4 text-xs text-gray-500">
          Note: This key is only stored in your browser's memory for this session.
        </p>
      </div>
    </div>
  );
};
