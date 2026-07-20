# SupportX AI 🚀

AI Powered Enterprise Customer Support Platform using NLP, Machine Learning, Voice AI, Analytics Dashboard, MongoDB Cloud, JWT Authentication, and Gemini API.

---


# 📊 Project Presentation

👉 [Click Here to View Presentation](https://docs.google.com/presentation/d/1y1IV7m5qUPM5tPgVBO7Pmn2SmRMptolp/edit?usp=drive_link&ouid=107084250459854339928&rtpof=true&sd=true)

---

## 📌 Project Overview

SupportX AI is a modern AI-powered customer support platform designed for intelligent enterprise assistance.

The platform includes:

* AI Chatbot
* NLP Processing
* Voice Recognition
* Analytics Dashboard
* MongoDB Cloud Integration
* JWT Authentication
* Firebase Security
* Real-time Monitoring
* AI Insights
* ML Predictions
* Sentiment Analysis

---
## 🚀 Production Deployment

SupportX AI is live in production and deployed using a cloud-based architecture.
---



# 🧠 AI / NLP / ML Features

## Natural Language Processing (NLP)

* Intent Detection
* Sentiment Analysis
* Smart Response Generation
* Context Understanding

## Machine Learning

* Query Prediction
* User Behavior Analytics
* Smart Recommendations
* AI Confidence Scoring

## Voice AI

* Speech Recognition
* Voice Commands
* AI Voice Responses

## Realtime Systems

* Live Monitoring
* Realtime User Tracking
* Active Sessions
* Database Sync

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* Framer Motion
* Recharts
* Lucide React
* CSS3

## Backend

* Flask
* Python
* JWT Authentication
* Gemini API

## Database

* MongoDB Atlas

---

# 🔐 Authentication & Security

* JWT Authentication
* Firebase Authentication
* Protected Dashboard Routes
* Secure API Communication

---

# ☁ Database

MongoDB Cloud is used for:

* Chat History
* User Sessions
* AI Analytics
* Realtime Logs

---

# 📊 Dashboard Sections

* AI Assistant
* AI Insights
* Users Panel
* Live Activity
* MongoDB Cloud
* Voice AI
* Security Center

---

# ⚡ Features

* Dynamic Dashboard
* Responsive UI
* Modern Sidebar Navigation
* Realtime Analytics
* AI Chat System
* Voice Assistant
* Upload System
* Interactive Charts
* Modern Enterprise Design

---

# 🚀 Installation

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

# 📁 Project Structure

```bash
SupportX-AI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│
├── README.md
├── .gitignore
```

---

# 👩‍💻 Author

Radhika Garg

GitHub:
https://github.com/Radhikagarg20

LinkedIn:
https://linkedin.com/in/radhikagarg-

---

# 🏗️ Production Architecture

SupportX AI is deployed as a full-stack cloud-based application.

```text
                         🌐 USER
                           │
                           ▼
              ┌────────────────────────┐
              │        VERCEL          │
              │   React + Vite         │
              │      Frontend          │
              └────────────┬───────────┘
                           │
                           │ REST API
                           ▼
              ┌────────────────────────┐
              │        RENDER          │
              │   Flask Backend API    │
              │     Python Server      │
              └────────────┬───────────┘
                           │
                 ┌─────────┴─────────┐
                 │                   │
                 ▼                   ▼
        ┌─────────────────┐  ┌─────────────────┐
        │   OPENROUTER    │  │  MONGODB ATLAS  │
        │   AI Engine     │  │  Cloud Database │
        └─────────────────┘  └─────────────────┘

---


# 🏗️ System Design

SupportX AI follows a layered full-stack architecture.

```text
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                        │
│                                                             │
│        React.js + Vite + Axios + Dashboard UI               │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ HTTPS / REST API
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                         API LAYER                           │
│                                                             │
│             Flask REST API + CORS + Routing                 │
│                                                             │
│  /signup   /login   /chat   /analytics   /recent-chats     │
└───────────────┬──────────────────┬──────────────────────────┘
                │                  │
                ▼                  ▼
┌──────────────────────┐   ┌─────────────────────────────────┐
│ AUTHENTICATION LAYER │   │       AI ORCHESTRATION LAYER     │
│                      │   │                                 │
│ JWT                  │   │ Prompt Construction             │
│ Password Hashing     │   │ Context Injection               │
│ Token Generation     │   │ LLM API Communication            │
└──────────────┬───────┘   └──────────────┬──────────────────┘
               │                          │
               ▼                          ▼
┌──────────────────────┐       ┌─────────────────────────────┐
│   MONGODB ATLAS      │       │        OPENROUTER            │
│                      │       │        LLM PROVIDER          │
│ Users                │       │                             │
│ Chat History         │       │   AI Response Generation    │
│ Analytics Data       │       └─────────────────────────────┘


---


Logical Relationship
┌─────────────────────┐
│       USERS         │
│                     │
│ _id                 │
│ name                │
│ email               │
│ password_hash       │
└──────────┬──────────┘
           │
           │ 1
           │
           │ N
┌──────────▼──────────┐
│    CHAT_HISTORY     │
│                     │
│ _id                 │
│ user_message        │
│ bot_response        │
└─────────────────────┘


---


---

# 6. API Contract

This is extremely good for a software engineering resume.

```markdown
# 🔌 API Design

| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Create a new user account |
| POST | `/login` | Authenticate user and return JWT |
| POST | `/chat` | Process an AI conversation |
| GET | `/recent-chats` | Retrieve recent conversations |
| GET | `/analytics` | Retrieve platform analytics |
| GET | `/` | Backend health check |

### Example: Chat Request

```json
{
  "message": "What is artificial intelligence?"
}

---
Deployment Workflow
Developer
    │
    ▼
GitHub Repository
    │
    ├──────────────► Vercel
    │                Frontend Deployment
    │
    └──────────────► Render
                     Backend Deployment

---
# 💡 Technical Highlights

- Designed and deployed a full-stack cloud application.
- Integrated LLM-based AI responses into a Flask REST API.
- Implemented secure password hashing and JWT authentication.
- Built persistent chat storage using MongoDB Atlas.
- Implemented real-time system context for date and time queries.
- Created independent frontend and backend deployment pipelines.
- Configured environment-based application secrets.
- Designed modular architecture for future NLP, ML, and voice capabilities.
└──────────────────────┘
