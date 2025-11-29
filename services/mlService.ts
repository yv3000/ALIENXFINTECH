
import { Transaction, TransactionType } from '../types';

// Browser-based Linear Regression for the live demo
// (Since we cannot execute Python XGBoost in the browser directly)
export const predictNextMonthBalance = (transactions: Transaction[]): number => {
  if (transactions.length < 5) return 0;

  // Group by day and calculate cumulative balance
  const dailyMap = new Map<string, number>();
  
  // Sort transactions by date
  const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  let currentBalance = 0;
  const balances: { day: number; balance: number }[] = [];
  const startDate = new Date(sorted[0].date).getTime();

  sorted.forEach(t => {
    if (t.type === TransactionType.INCOME) currentBalance += t.amount;
    else currentBalance -= t.amount;
    
    const daysSinceStart = Math.floor((new Date(t.date).getTime() - startDate) / (1000 * 60 * 60 * 24));
    balances.push({ day: daysSinceStart, balance: currentBalance });
  });

  // Simple Linear Regression: y = mx + b
  const n = balances.length;
  const sumX = balances.reduce((acc, val) => acc + val.day, 0);
  const sumY = balances.reduce((acc, val) => acc + val.balance, 0);
  const sumXY = balances.reduce((acc, val) => acc + (val.day * val.balance), 0);
  const sumXX = balances.reduce((acc, val) => acc + (val.day * val.day), 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Predict 30 days from last data point
  const lastDay = balances[balances.length - 1].day;
  const predictionDay = lastDay + 30;
  
  return slope * predictionDay + intercept;
};


// ---------------------------------------------------------
// PYTHON CODE EXPORTS FOR THE HACKATHON DELIVERABLE
// ---------------------------------------------------------

export const FASTAPI_CODE = `
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Literal
import joblib
import pandas as pd

app = FastAPI(title="ALIENXFINTECH API")

# Load trained XGBoost model
try:
    model = joblib.load("alienx_cashflow_model.pkl")
except:
    model = None

class Transaction(BaseModel):
    amount: float
    category: str
    type: Literal['INCOME', 'EXPENSE']

@app.post("/predict")
def predict_cashflow(history: List[float]):
    if not model:
        return {"error": "Model not loaded"}
    # Prediction logic using loaded model
    prediction = model.predict([history])
    return {"predicted_balance_30d": float(prediction[0])}

@app.post("/nudge")
def generate_nudge(transactions: List[Transaction]):
    # Python rule engine
    alerts = []
    total_exp = sum(t.amount for t in transactions if t.type == 'EXPENSE')
    if total_exp > 2000:
        alerts.append("High Spending Alert")
    return {"nudges": alerts}
`;

export const XGBOOST_CODE = `
import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split

# 1. Load Dataset
df = pd.read_csv("synthetic_finances.csv")

# 2. Preprocessing
X = df[['day_of_month', 'is_weekend', 'prev_day_balance']]
y = df['daily_spend']

# 3. Train Model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = xgb.XGBRegressor(objective='reg:squarederror')
model.fit(X_train, y_train)

# 4. Save
import joblib
joblib.dump(model, "alienx_cashflow_model.pkl")
`;

export const AGENT_CODE = `
import os
from langchain.llms import HuggingFaceHub
from langchain.agents import initialize_agent, Tool

# Free Tier LLM via HuggingFace
llm = HuggingFaceHub(
    repo_id="mistralai/Mixtral-8x7B-Instruct-v0.1", 
    huggingfacehub_api_token=os.environ["HF_TOKEN"]
)

def get_balance(dummy_arg):
    # Connect to DB
    return "2450 Credits"

tools = [
    Tool(
        name="Get Balance",
        func=get_balance,
        description="Returns current account balance"
    )
]

agent = initialize_agent(tools, llm, agent="zero-shot-react-description")
response = agent.run("How much money do I have?")
print(response)
`;
