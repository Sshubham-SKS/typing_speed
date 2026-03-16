const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const TypingResult = sequelize.define('TypingResult', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  words_typed: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  time_taken: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  speed: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  accuracy: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

// Setup Associations
User.hasMany(TypingResult, { foreignKey: 'userId', as: 'results' });
TypingResult.belongsTo(User, { foreignKey: 'userId' });

module.exports = TypingResult;
