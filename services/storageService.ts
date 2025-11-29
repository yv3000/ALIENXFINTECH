
import { Transaction, TransactionType, Nudge } from '../types';

const STORAGE_KEY = 'alienx_transactions';
const NUDGE_KEY = 'alienx_nudges';

export const getTransactions = (): Transaction[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTransaction = (transaction: Transaction): Transaction[] => {
  const current = getTransactions();
  const updated = [...current, transaction];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const clearTransactions = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(NUDGE_KEY);
};

export const getNudges = (): Nudge[] => {
  const data = localStorage.getItem(NUDGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveNudge = (nudge: Nudge): void => {
  const current = getNudges();
  // Avoid duplicates based on message content for this hackathon demo
  if (!current.find(n => n.message === nudge.message)) {
    const updated = [nudge, ...current].slice(0, 10); // Keep last 10
    localStorage.setItem(NUDGE_KEY, JSON.stringify(updated));
  }
};

// Seed initial data if empty
export const seedData = () => {
  if (getTransactions().length === 0) {
    const today = new Date();
    const data: Transaction[] = [];
    
    // Generate 30 days of data
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      // Random Income (Salary twice a month)
      if (date.getDate() === 1 || date.getDate() === 15) {
        data.push({
          id: `seed-inc-${i}`,
          date: dateStr,
          amount: 2500,
          category: 'Salary',
          type: TransactionType.INCOME,
          description: 'Galactic Credits Deposit'
        });
      }

      // Random Expenses
      if (Math.random() > 0.3) {
        data.push({
          id: `seed-exp-${i}`,
          date: dateStr,
          amount: Math.floor(Math.random() * 100) + 20,
          category: ['Food', 'Transport', 'Tech', 'Entertainment'][Math.floor(Math.random() * 4)],
          type: TransactionType.EXPENSE,
          description: 'Daily consumption'
        });
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};
