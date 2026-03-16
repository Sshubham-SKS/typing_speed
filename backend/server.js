require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db');

// Import models to initialize them
const User = require('./models/User');
const TypingResult = require('./models/TypingResult');

const app = express();

app.use(cors());
app.use(express.json());

// Main Route
app.get('/', (req, res) => {
  res.send('Typing Speed Analytics API is running...');
});

app.get('/api/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected', message: err.message });
  }
});

// Import Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/typing', require('./routes/typing'));

const PORT = process.env.PORT || 5000;

// Connect to Database and start server
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Authentication Successful.');
        
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully.');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Critical Error during backend startup:');
        console.error(err);
        process.exit(1);
    }
};

startServer();
