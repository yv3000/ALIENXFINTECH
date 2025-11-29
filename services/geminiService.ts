
import { GoogleGenAI } from "@google/genai";
import { getTransactions } from "./storageService";
import { Transaction, TransactionType } from "../types";

// Initialize with process.env.API_KEY as per guidelines.
// Assume API_KEY is present in the environment.
const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

// SIMULATED AI (Rule-based) for Fallback
const mockAIResponse = (message: string, transactions: Transaction[]): string => {
  const msg = message.toLowerCase();
  
  // Calculate stats for context
  const income = transactions.filter(t => t.type === TransactionType.INCOME).reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === TransactionType.EXPENSE).reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  if (msg.includes('balance') || msg.includes('money') || msg.includes('have')) {
    return `BASED ON MY CALCULATIONS, YOUR CURRENT LIQUIDITY IS ${balance.toFixed(2)} CREDITS.`;
  }
  
  if (msg.includes('spent') || msg.includes('expense') || msg.includes('cost')) {
    return `TOTAL EXPENDITURE FOR THIS CYCLE IS ${expense.toFixed(2)} CREDITS. WATCH YOUR BURN RATE.`;
  }

  if (msg.includes('income') || msg.includes('make') || msg.includes('earned')) {
    return `TOTAL REVENUE DETECTED: ${income.toFixed(2)} CREDITS.`;
  }

  if (msg.includes('prediction') || msg.includes('future')) {
    return `MY ALGORITHMS PREDICT A 12% VARIANCE IN YOUR CASHFLOW NEXT MONTH. RECOMMENDATION: HODL.`;
  }

  return `I AM ALIENX. I ANALYZE NUMBERS, NOT SMALL TALK. ASK ME ABOUT YOUR FINANCES.`;
};

// REAL AI (Gemini)
export const sendMessageToAlien = async (message: string): Promise<string> => {
  const transactions = getTransactions();

  try {
    // Construct context
    const context = `
      You are ALIENX, a futuristic, robotic financial advisor. 
      The user has the following financial status:
      - Total Transactions: ${transactions.length}
      - Recent Transaction: ${transactions[transactions.length - 1]?.description || 'None'} (${transactions[transactions.length - 1]?.amount || 0})
      
      Answer the user's question briefly in a cool, sci-fi alien persona.
      User Question: "${message}"
    `;

    // Use gemini-2.5-flash as per guidelines for text tasks
    const model = "gemini-2.5-flash"; 
    const response = await genAI.models.generateContent({
      model: model,
      contents: context,
    });
    
    return response.text || "COMMUNICATION ERROR.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return mockAIResponse(message, transactions); // Fallback
  }
};
