
import React, { useState } from 'react';
import { FASTAPI_CODE, XGBOOST_CODE, AGENT_CODE } from '../services/mlService';
import { Copy, Check } from 'lucide-react';

export const CodeViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'backend' | 'ml' | 'agent'>('backend');
  const [copied, setCopied] = useState(false);

  const code = activeTab === 'backend' ? FASTAPI_CODE : activeTab === 'ml' ? XGBOOST_CODE : AGENT_CODE;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-alien-900 border border-alien-700 rounded-lg overflow-hidden flex flex-col h-[500px]">
      <div className="flex border-b border-alien-700 overflow-x-auto">
        <button
          onClick={() => setActiveTab('backend')}
          className={`px-4 py-2 font-mono text-sm whitespace-nowrap ${activeTab === 'backend' ? 'bg-alien-800 text-alien-500 border-b-2 border-alien-500' : 'text-gray-400 hover:text-white'}`}
        >
          backend/main.py
        </button>
        <button
          onClick={() => setActiveTab('ml')}
          className={`px-4 py-2 font-mono text-sm whitespace-nowrap ${activeTab === 'ml' ? 'bg-alien-800 text-alien-500 border-b-2 border-alien-500' : 'text-gray-400 hover:text-white'}`}
        >
          backend/ml_model.py
        </button>
        <button
          onClick={() => setActiveTab('agent')}
          className={`px-4 py-2 font-mono text-sm whitespace-nowrap ${activeTab === 'agent' ? 'bg-alien-800 text-alien-500 border-b-2 border-alien-500' : 'text-gray-400 hover:text-white'}`}
        >
          backend/agent.py
        </button>
        <div className="flex-1"></div>
        <button onClick={handleCopy} className="px-4 text-gray-400 hover:text-white flex items-center gap-2 text-xs">
          {copied ? <Check size={14} className="text-green-500"/> : <Copy size={14} />}
          {copied ? 'COPIED' : 'COPY CODE'}
        </button>
      </div>
      <div className="flex-1 overflow-auto bg-[#0d1117] p-4">
        <pre className="font-mono text-xs text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
