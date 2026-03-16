<img width="1919" height="1032" alt="Screenshot 2026-03-16 174723" src="https://github.com/user-attachments/assets/273d48b5-ec88-439e-abba-8da9b1bffc33" /># ⚡ Typing Speed - Cinematic Pro

A high-performance, premium typing analytics application built with **React**, **Node.js**, and **Google Gemini AI**. Designed for a high-impact, cinematic experience with ultra-wide layout support and AI-driven infinite practice.

<img width="1919" height="917" alt="Screenshot 2026-03-16 193053" src="https://github.com/user-attachments/assets/461d2779-7c6d-4c80-8ad3-719aa699a253" />

<img width="1919" height="1033" alt="Screenshot 2026-03-16 193104" src="https://github.com/user-attachments/assets/b8a757c5-d53c-4741-9d04-ae8c208831d8" />

<img width="1919" height="1032" alt="Screenshot 2026-03-16 174723" src="https://github.com/user-attachments/assets/28f1fa51-9897-4aad-8154-a104e4b60aa8" />

<img width="1917" height="921" alt="Screenshot 2026-03-16 193031" src="https://github.com/user-attachments/assets/999b3357-7ed2-455d-9f5e-e1c3c3a978d4" />

<img width="1919" height="1030" alt="Screenshot 2026-03-16 193009" src="https://github.com/user-attachments/assets/baa480c5-cf38-4487-b174-c4d552784559" />

<img width="1919" height="908" alt="Screenshot 2026-03-16 193042" src="https://github.com/user-attachments/assets/10cd1fc4-cd3c-480b-b64b-2f7f8ece0597" />



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
