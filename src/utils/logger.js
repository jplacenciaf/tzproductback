const fs = require('fs');

const logger = (message) => {
  const logMessage = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync('logs.txt', logMessage);
};

module.exports = logger;
