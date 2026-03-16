const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const TypingResult = require('../models/TypingResult');
const { Sequelize } = require('sequelize');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Middleware to protect routes
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

// Generate Text using Gemini
router.get('/generateText', async (req, res) => {
  try {
    const { GoogleGenAI } = require('@google/genai');
    const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent('Generate a unique random paragraph of about 40-50 words for a typing test. Do not include any headers, quotes, or formatting. Just the plain text.');
    const response = await result.response;
    const text = response.text().trim();
    
    res.json({ text });
  } catch (error) {
    console.error("Gemini Error:", error);
    // Rotating fallbacks if API fails to provide variety
    const fallbacks = [
      "The quick brown fox jumps over the lazy dog in a field of green grass. This classic sentence contains every letter of the alphabet and is often used to test keyboards and fonts. Practice makes perfect when it comes to improving your typing speed and accuracy over time.",
      "Artificial intelligence is transforming the way we interact with technology and each other. From autonomous vehicles to advanced language models, the potential for innovation seems limitless. As we move forward, it is important to consider the ethical implications of these powerful new tools in our society.",
      "Exploring the deep blue ocean reveals a world of mystery and wonder beneath the waves. Vibrant coral reefs provide a home for countless marine species, while deep-sea hydrothermal vents support unique ecosystems in the dark. Protecting our oceans is vital for the health of our planet and future generations.",
      "Space exploration has always captured the imagination of humanity as we gaze at the twinkling stars. Missions to the moon and Mars represent our collective desire to understand the universe and our place within it. The vastness of the galaxy reminds us of the endless possibilities for discovery."
    ];
    const fallbackText = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    res.json({ text: fallbackText });
  }
});

// Save Result
router.post('/saveResult', auth, async (req, res) => {
  try {
    const { words_typed, time_taken, speed, accuracy } = req.body;
    
    const result = await TypingResult.create({
      userId: req.userId,
      words_typed,
      time_taken,
      speed,
      accuracy
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all results
router.get('/results/:userId', auth, async (req, res) => {
  try {
    if(req.userId !== req.params.userId) return res.status(403).json({error: 'Unauthorized'});
    
    const results = await TypingResult.findAll({
      where: { userId: req.params.userId },
      order: [['date', 'DESC']]
    });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Last 5 results
router.get('/last5/:userId', auth, async (req, res) => {
  try {
    if(req.userId !== req.params.userId) return res.status(403).json({error: 'Unauthorized'});

    const results = await TypingResult.findAll({
      where: { userId: req.params.userId },
      order: [['date', 'DESC']],
      limit: 5
    });
    // Reverse to get chronological order for charts
    res.json(results.reverse());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Analytics
router.get('/analytics/:userId', auth, async (req, res) => {
  try {
    if(req.userId !== req.params.userId) return res.status(403).json({error: 'Unauthorized'});

    const userId = req.params.userId;
    
    // Total tests
    const total_tests = await TypingResult.count({ where: { userId } });
    
    if (total_tests === 0) {
      return res.json({ total_tests: 0, avg_speed: 0, best_speed: 0, avg_accuracy: 0, total_time: 0 });
    }

    // Averages and Best
    const stats = await TypingResult.findOne({
      where: { userId },
      attributes: [
        [Sequelize.fn('avg', Sequelize.col('speed')), 'avg_speed'],
        [Sequelize.fn('max', Sequelize.col('speed')), 'best_speed'],
        [Sequelize.fn('avg', Sequelize.col('accuracy')), 'avg_accuracy'],
        [Sequelize.fn('sum', Sequelize.col('time_taken')), 'total_time']
      ],
      raw: true
    });

    res.json({
      total_tests,
      avg_speed: Math.round(stats.avg_speed || 0),
      best_speed: stats.best_speed || 0,
      avg_accuracy: Math.round(stats.avg_accuracy || 0),
      total_time: stats.total_time || 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
