const { createLogger, transports, format } = require('winston');

const logLevels = {
  info: 'info',
  error: 'error',
  warn: 'warn',
  debug: 'debug',
};

const logger = createLogger({
  level: logLevels.info,
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;