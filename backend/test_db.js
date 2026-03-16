const fs = require('fs');
require('dotenv').config();
const { sequelize } = require('./config/db');

async function test() {
  let log = '';
  try {
    log += 'Starting DB connection test...\n';
    log += `DB Config: Host=${process.env.DB_HOST}, User=${process.env.DB_USER}, Name=${process.env.DB_NAME}\n`;
    
    await sequelize.authenticate();
    log += 'Connection established successfully.\n';
    
    await sequelize.sync({ alter: true });
    log += 'Database synced.\n';
    
    const User = sequelize.models.User;
    const count = await User.count();
    log += `User count: ${count}\n`;
    
  } catch (error) {
    log += `ERROR: ${error.message}\n`;
    log += `Stack: ${error.stack}\n`;
  } finally {
    fs.writeFileSync('out_db.txt', log);
    process.exit(0);
  }
}
test();
