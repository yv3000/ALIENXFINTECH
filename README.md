<div align="center">

# 🚀 ALIENXFINTECH
### AI Financial Copilot for Irregular Income

<img width="100%" alt="Banner" src="src\photo\web_ss.png" />

<br/>

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br/>

**Built for MumbaiHacks 2025 (Round 2 — On-Ground)** *By Team ALIENXCODE*

</div>

---

## 💡 The Problem
Gig workers, freelancers, delivery partners, and students suffer from **income volatility**. Traditional budgeting apps assume a fixed monthly salary, leaving millions of people without proper financial guidance when their cashflow is unpredictable.

## ⚡ The Solution: ALIENXFINTECH
An AI-powered financial copilot that predicts cashflow, tracks expenses, provides real-time "smart nudges," and offers a conversational interface to help users navigate financial uncertainty.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 📈 **Cashflow Forecasting** | ML-supported logic to predict surplus or deficits based on irregular history. |
| 🔔 **Smart Nudges** | Real-time alerts for low balances, upcoming rent, or overspending risks. |
| 🧠 **AI Chat Copilot** | A conversational agent (Llama 3 / Mixtral) for financial advice. |
| 💸 **Smart Tracking** | Easy logging of sporadic income and daily expenses. |
| 📊 **Visual Dashboard** | Clear charts showing weekly financial health at a glance. |

---

## 🧱 Tech Stack

### **Frontend**
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Visualization:** Chart.js
* **HTTP Client:** Axios

### **Backend & AI**
* **API:** FastAPI (Python)
* **Database:** JSON DB / Google Sheets API (for prototyping)
* **ML Engine:** XGBoost (Cashflow prediction)
* **LLM Integration:** HuggingFace Inference API (Meta-Llama-3 / Mixtral)

---

## 🛠️ Run Locally

Follow these steps to set up the project on your local machine.

### **Prerequisites**
* Node.js (v16+)
* Python (v3.10+)
* Git

### **1️⃣ Clone the Repository**
```bash
git clone [https://github.com/yourusername/ALIENXFINTECH.git](https://github.com/yourusername/ALIENXFINTECH.git)
cd ALIENXFINTECH

2️⃣ Frontend Setup

Navigate to the frontend folder and install dependencies.
Bash

cd frontend
npm install

Create a .env.local file in the frontend root:
Code snippet

VITE_GEMINI_API_KEY=your_gemini_key_here
VITE_API_URL=http://localhost:8000

Start the development server:
Bash

npm run dev

    The UI will run at: http://localhost:5173

3️⃣ Backend Setup (Optional/Full Mode)

Open a new terminal and navigate to the backend folder.
Bash

cd backend
# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

Set up your environment variables:
Bash

export HUGGINGFACE_API_KEY=your_hf_key

Start the FastAPI server:
Bash

uvicorn main:app --reload

    The API will run at: http://localhost:8000

🧪 Demo Script (For Judges)

    Context Setting: "Traditional apps fail gig workers. We built a copilot for the unorganised sector."

    Input Data: Show adding a freelance payment (Income) and a sudden repair cost (Expense).

    Visualization: Show the Dashboard updating the 'Safe to Spend' limit instantly.

    The Nudge: Trigger a warning: "Your predicted balance for Friday is low. Avoid eating out today."

    AI Interaction: Ask the Chatbot: "Can I afford a new bike helmet?" and see the context-aware response.

👨‍💻 Team ALIENXCODE

Name	Role
Aryan Kahar	🧠 Lead, AI Agent & Architecture
Yash Vishwakarma	⚙️ Backend & API Development
Raghavendra	🎨 Frontend & UI/UX
Aaryan Singh	🔮 ML & Forecasting Logic

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

<div align="center">

<sub>Made with ❤️ at MumbaiHacks 2025</sub> </div>
