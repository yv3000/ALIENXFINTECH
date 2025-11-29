import React from 'react';
import { SavingsGoal } from '../types';
import { Target } from 'lucide-react';

interface Props {
  goals: SavingsGoal[];
}

export const GoalsWidget: React.FC<Props> = ({ goals }) => {
  return (
    <div className="bg-alien-800 border border-alien-700 p-4 rounded-lg h-full">
      <div className="flex items-center mb-4 text-alien-400">
        <Target size={18} className="mr-2" />
        <h4 className="font-mono text-sm font-bold tracking-wider">GALACTIC_GOALS</h4>
      </div>
      <div className="space-y-4">
        {goals.map(goal => {
          const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          return (
            <div key={goal.id} className="group">
              <div className="flex justify-between text-xs mb-1 font-mono text-gray-300">
                <span>{goal.icon} {goal.name}</span>
                <span>{percent}%</span>
              </div>
              <div className="h-2 bg-alien-900 rounded-full overflow-hidden border border-alien-700/50">
                <div 
                  className="h-full bg-gradient-to-r from-alien-500 to-alien-accent transition-all duration-1000 ease-out group-hover:shadow-[0_0_10px_rgba(0,255,157,0.5)]"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] mt-1 text-gray-500 font-mono">
                <span>${goal.currentAmount}</span>
                <span>${goal.targetAmount}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};