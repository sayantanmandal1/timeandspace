# Time and Space: FAANG-Level DSA Code Analysis & Visualization Platform

## Overview

**Time and Space** is a full stack, FAANG-level platform for analyzing and visualizing Data Structures & Algorithms (DSA) code in any major language. It provides:
- Multi-language support (Python, Java, C++, JavaScript, and more)
- Interactive AST (Abstract Syntax Tree) visualization
- Step-by-step execution trace and graph-based visualizations
- Time and space complexity analysis with explanations
- Actionable optimization suggestions
- Modern, beautiful, and educational UI/UX
- Free and open source, ready for the 2025 job market

## Features
- **Multi-language input:** Analyze code in Python, Java, C++, JavaScript, and more
- **AST analysis:** Interactive tree, statistics, detected data structures, algorithms, functions, variables
- **Complexity analysis:** Time/space complexity, worst/best/average case, detailed explanations
- **Execution trace:** Step-by-step, with variable state, call stack, and error display
- **Graph-based visualizations:** Execution flow, memory usage, performance comparison, and more
- **Optimization suggestions:** Contextual, actionable, and language-aware
- **Modern UI:** Tabs, tooltips, onboarding, loading/error states, and accessibility

## Setup Instructions

### Prerequisites
- **Backend:** Python 3.10+, pip
- **Frontend:** Node.js 18+, npm
- **(Optional for full language support):** Docker (for self-hosting runx or other code runners)

### Backend (FastAPI)
1. **Install dependencies:**
   ```sh
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
2. **Run the backend:**
   ```sh
   uvicorn app.main:app --reload
   ```
   The API will be available at `http://127.0.0.1:8000/api/v1`.

### Frontend (React)
1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```
2. **Run the frontend:**
   ```sh
   npm start
   ```
   The app will be available at `http://localhost:3000`.

### Environment Variables
- You can set `REACT_APP_API_URL` in `frontend/.env` to point to your backend if not running on default.

### Deployment
- **Backend:** Deploy with Docker, Gunicorn, or any cloud provider.
- **Frontend:** Deploy to Vercel, Netlify, or any static hosting provider.
- **CORS:** Ensure CORS is enabled in FastAPI for frontend-backend communication.

## Usage Guide
1. **Paste or write your DSA code** in the editor.
2. **Select the language.**
3. **Optionally provide input data** (as a JSON array).
4. **Click Analyze** to see results.
5. **Explore the results tabs:**
   - **AST:** Interactive tree, statistics, data structures, algorithms, functions, variables
   - **Complexity:** Charts, worst/best/average case, explanations
   - **Trace:** Step-by-step execution, variable state, call stack, graph visualization
   - **Visualizations:** Execution flow, memory usage, performance, and more
   - **Optimizations:** Actionable suggestions

## Architecture
- **Backend:** FastAPI, tree-sitter, runx (for code execution), advanced analysis modules
- **Frontend:** React, Material-UI, Recharts, vis-network, custom visualizers

## Extending & Customizing
- Add more languages by extending tree-sitter and runx integration
- Add new visualizations or analysis modules in backend and frontend
- Integrate with open-source LLMs for deeper code explanations

## License
MIT. Free for personal and commercial use.

## Authors
- [Your Name Here]

---

**This project is designed to stand out in the 2025 job market and is ready to impress at any FAANG interview or coding showcase!** 