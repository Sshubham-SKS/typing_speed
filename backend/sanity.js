const fs = require('fs');
fs.writeFileSync('alive.txt', 'Script is running at ' + new Date().toISOString());
process.exit(0);
