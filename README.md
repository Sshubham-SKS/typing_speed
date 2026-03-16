# ⚡ Typing Speed - Cinematic Pro

A high-performance, premium typing analytics application built with **React**, **Node.js**, and **Google Gemini AI**. Designed for a high-impact, cinematic experience with ultra-wide layout support and AI-driven infinite practice.

![Dashboard Preview](https://github.com/Sshubham-SKS/typing_speed/raw/master/frontend/public/dashboard-preview.png)

## ✨ Unique Features

### 🤖 AI-Powered Infinite Typing
Never type the same paragraph twice. The application integrates with the **Google Gemini Pro API** to generate fresh, unique content in real-time. If you reach the end of a text, more is fetched automatically, allowing for truly infinite practice sessions.

### 🎥 Cinematic Scroll Engine
Designed for focus. As you type, the text moves with a smooth, line-by-line cinematic animation. The cursor remains in the top quarter of the view, ensuring that upcoming text is always visible and your eyes stay centered.

### 📊 Professional Analytics
Track your progress like a pro.
- **Real-time Metrics**: WPM (Words Per Minute) and Accuracy calculated instantly.
- **Historical Data**: Comprehensive charts showing speed trends over time.
- **Advanced Distribution**: Bar graphs for accuracy consistency and test duration patterns.

### 💎 Premium UI/UX Polish
- **Glassmorphism Design**: Sleek, transparent UI elements with vibrant accent colors.
- **Ultra-Wide Optimization**: Specifically tailored for cinematic monitors with `1600px` max-width layouts.
- **Upscaled Readability**: Large `4XL` fonts and bold UI components for maximum readability and visual comfort.

## 🛠 Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Chart.js, React-Icons
- **Backend**: Node.js, Express.js, Sequelize ORM
- **Database**: MySQL
- **AI Integration**: Google Generative AI (Gemini Pro)
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt password hashing

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MySQL Database

### 2. Installation
Clone the repository:
```bash
git clone https://github.com/Sshubham-SKS/typing_speed.git
cd typing_speed
```

#### Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=typing_speed
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_google_ai_key
```

#### Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

## 📂 Project Structure
- `/frontend`: Vite + React application, Tailwind styles, and Chart.js integration.
- `/backend`: Express API, JWT auth, Gemini AI service, and Sequelize models.
- `/models`: Database schema for Users and Typing Results.

## ⚖️ License
MIT License - Developed with focus on performance and visual excellence.
