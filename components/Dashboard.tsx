
import React, { useEffect, useState } from 'react';
import { Transaction, TransactionType, Nudge } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
  transactions: Transaction[];
  prediction: number;
}

export const Dashboard: React.FC<Props> = ({ transactions, prediction }) => {
  const [nudges, setNudges] = useState<Nudge[]>([]);

  useEffect(() => {
    generateClientSideNudges();
  }, [transactions]);

  const generateClientSideNudges = () => {
    const newNudges: Nudge[] = [];
    
    // Calculate Balance
    const totalIncome = transactions.filter(t => t.type === TransactionType.INCOME).reduce((a, b) => a + b.amount, 0);
    const totalExpense = transactions.filter(t => t.type === TransactionType.EXPENSE).reduce((a, b) => a + b.amount, 0);
    const balance = totalIncome - totalExpense;

    // Rule 1: Low Balance
    if (balance < 1000) {
      newNudges.push({
        id: 'n1',
        title: 'CRITICAL_BALANCE',
        message: 'Balance below 1000 credits. Immediate austerity recommended.',
        severity: 'critical',
        timestamp: Date.now()
      });
    }

    // Rule 2: High Spending detection (Last 3 transactions)
    const recent = [...transactions].reverse().slice(0, 3);
    const highSpend = recent.find(t => t.type === TransactionType.EXPENSE && t.amount > 300);
    if (highSpend) {
      newNudges.push({
        id: 'n2',
        title: 'HIGH_VELOCITY_SPEND',
        message: `Detected abnormal outflow: $${highSpend.amount} on ${highSpend.category}.`,
        severity: 'warning',
        timestamp: Date.now()
      });
    }

    // Rule 3: Weekly Surplus
    if (totalIncome > totalExpense * 1.5) {
      newNudges.push({
        id: 'n3',
        title: 'SURPLUS_DETECTED',
        message: 'Excess liquidity available. Allocate to Neural Link Upgrade?',
        severity: 'info',
        timestamp: Date.now()
      });
    }

    setNudges(newNudges);
  };

  // Process Data for Charts
  const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  let balance = 0;
  const data = sorted.map(t => {
    if (t.type === TransactionType.INCOME) balance += t.amount;
    else balance -= t.amount;
    return {
      date: t.date,
      balance: balance,
      amount: t.amount
    };
  });

  const totalIncome = transactions.filter(t => t.type === TransactionType.INCOME).reduce((a, b) => a + b.amount, 0);
  const totalExpense = transactions.filter(t => t.type === TransactionType.EXPENSE).reduce((a, b) => a + b.amount, 0);
  const currentBalance = totalIncome - totalExpense;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      
      {/* Nudge Banner */}
      {nudges.length > 0 && (
        <div className="grid gap-2">
          {nudges.map(nudge => (
            <div key={nudge.id} className={`p-3 rounded border flex items-center justify-between ${
              nudge.severity === 'critical' ? 'bg-red-900/20 border-red-500/50 text-red-200' :
              nudge.severity === 'warning' ? 'bg-yellow-900/20 border-yellow-500/50 text-yellow-200' :
              'bg-alien-900/50 border-alien-500/30 text-alien-200'
            }`}>
              <div className="flex items-center gap-3">
                <AlertTriangle size={16} />
                <span className="font-mono text-xs font-bold">[{nudge.title}]</span>
                <span className="text-sm truncate">{nudge.message}</span>
              </div>
              <span className="text-[10px] font-mono opacity-50">NOW</span>
            </div>
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-alien-800 border border-alien-700 p-4 rounded-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
            <Activity size={40} className="text-alien-500" />
          </div>
          <p className="text-gray-400 text-xs font-mono mb-1">CURRENT_BALANCE</p>
          <h3 className="text-2xl font-bold text-white font-mono">${currentBalance.toFixed(2)}</h3>
        </div>

        <div className="bg-alien-800 border border-alien-700 p-4 rounded-lg">
          <p className="text-gray-400 text-xs font-mono mb-1">TOTAL_INCOME</p>
          <div className="flex items-center text-green-400">
            <ArrowUpRight size={16} className="mr-1" />
            <h3 className="text-2xl font-bold font-mono">${totalIncome.toFixed(2)}</h3>
          </div>
        </div>

        <div className="bg-alien-800 border border-alien-700 p-4 rounded-lg">
          <p className="text-gray-400 text-xs font-mono mb-1">TOTAL_SPEND</p>
          <div className="flex items-center text-red-400">
            <ArrowDownRight size={16} className="mr-1" />
            <h3 className="text-2xl font-bold font-mono">${totalExpense.toFixed(2)}</h3>
          </div>
        </div>

        <div className="bg-alien-800 border border-alien-500/50 p-4 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-alien-500/5 z-0"></div>
          <p className="text-alien-500 text-xs font-mono mb-1 font-bold z-10 relative">AI_PREDICTION (30 Days)</p>
          <div className="flex items-center text-alien-400 z-10 relative">
            <TrendingUp size={16} className="mr-1" />
            <h3 className="text-2xl font-bold font-mono">${prediction.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-alien-800 border border-alien-700 p-4 rounded-lg h-[300px]">
        <h4 className="text-gray-300 font-mono text-sm mb-4">BALANCE_TRAJECTORY</h4>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00ff9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#142533" />
            <XAxis dataKey="date" stroke="#475569" fontSize={10} tickFormatter={(str) => str.slice(5)} />
            <YAxis stroke="#475569" fontSize={10} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0b1620', borderColor: '#00ff9d', color: '#fff' }}
              itemStyle={{ color: '#00ff9d' }}
            />
            <Area type="monotone" dataKey="balance" stroke="#00ff9d" fillOpacity={1} fill="url(#colorBalance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Transaction History */}
      <div className="bg-alien-800 border border-alien-700 p-4 rounded-lg">
        <h4 className="text-gray-300 font-mono text-sm mb-4">RECENT_TRANSACTIONS</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...transactions].reverse().slice(0, 9).map(t => (
            <div key={t.id} className="flex justify-between items-center bg-alien-900/50 p-3 rounded border border-alien-700/50 hover:border-alien-500/30 transition-colors">
              <div>
                <p className="text-white text-sm font-bold truncate">{t.category}</p>
                <p className="text-gray-500 text-xs truncate">{t.date} • {t.description}</p>
              </div>
              <span className={`font-mono font-bold ${t.type === TransactionType.INCOME ? 'text-green-400' : 'text-red-400'}`}>
                {t.type === TransactionType.INCOME ? '+' : '-'}${t.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
