
import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { ChatInterface } from './components/ChatInterface';
import { CodeViewer } from './components/CodeViewer';
import { seedData, getTransactions } from './services/storageService';
import { predictNextMonthBalance } from './services/mlService';
import { Transaction } from './types';
import { Zap, Code, LayoutDashboard } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'code'>('dashboard');
  const [data, setData] = useState<Transaction[]>([]);
  const [prediction, setPrediction] = useState(0);

  // Initialize
  useEffect(() => {
    seedData(); // Create fake data if empty
    refreshData();
  }, []);

  const refreshData = () => {
    const txns = getTransactions();
    setData(txns);
    const pred = predictNextMonthBalance(txns);
    setPrediction(pred);
  };

  return (
    <div className="min-h-screen bg-alien-900 text-gray-200 font-sans selection:bg-alien-500 selection:text-black">
      {/* Header */}
      <header className="border-b border-alien-700 bg-alien-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="text-alien-500" />
            <h1 className="text-xl font-bold tracking-wider text-white">ALIENX<span className="text-alien-500">FINTECH</span></h1>
          </div>
          
          <nav className="flex space-x-1 bg-alien-800 p-1 rounded-lg">
            <button 
              onClick={() => setView('dashboard')}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-2 ${view === 'dashboard' ? 'bg-alien-500 text-alien-900' : 'hover:text-white text-gray-400'}`}
            >
              <LayoutDashboard size={16} /> DASHBOARD
            </button>
            <button 
              onClick={() => setView('code')}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-2 ${view === 'code' ? 'bg-alien-500 text-alien-900' : 'hover:text-white text-gray-400'}`}
            >
              <Code size={16} /> CODE
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 lg:h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          
          {/* Left/Center: Dashboard or Code */}
          <div className="lg:col-span-2 space-y-6 overflow-y-auto pb-10">
            {view === 'dashboard' ? (
              <Dashboard transactions={data} prediction={prediction} />
            ) : (
              <div className="space-y-4">
                 <div className="bg-alien-800/50 p-4 rounded border border-alien-500/20">
                    <h3 className="text-alien-400 font-bold mb-2">Architecture Overview</h3>
                    <p className="text-sm text-gray-400">
                      The live demo uses a React Client + Gemini API (Free Tier) architecture.
                      Below is the production-ready Python FastAPI + XGBoost backend code required for the full scale implementation.
                    </p>
                 </div>
                 <CodeViewer />
              </div>
            )}
          </div>

          {/* Right: AI Agent (Always visible on large screens) */}
          <div className="lg:col-span-1 h-[600px] lg:h-full rounded-lg overflow-hidden shadow-2xl shadow-alien-500/10 border border-alien-700">
            <ChatInterface />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
