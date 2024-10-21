import { createLogger, format, transports } from 'winston';
import a6_0x18fb25 from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x1a393e,
  message: _0x1bec30,
  timestamp: _0xe4f9a3
}) => {
  return _0xe4f9a3 + " [" + _0x1a393e + "]: " + _0x1bec30;
});
class Logger {
  constructor() {
    this.logger = createLogger({
      'level': "debug",
      'format': combine(timestamp({
        'format': "YYYY-MM-DD HH:mm:ss"
      }), colorize(), customFormat),
      'transports': [new transports.File({
        'filename': "log/app.log"
      })],
      'exceptionHandlers': [new transports.File({
        'filename': "log/app.log"
      })],
      'rejectionHandlers': [new transports.File({
        'filename': "log/app.log"
      })]
    });
  }
  ['info'](_0x7db829) {
    this.logger.info(_0x7db829);
  }
  ["warn"](_0xa9ec3c) {
    this.logger.warn(_0xa9ec3c);
  }
  ['error'](_0x2ea6b8) {
    this.logger.error(_0x2ea6b8);
  }
  ["debug"](_0x590012) {
    this.logger.debug(_0x590012);
  }
  ["setLevel"](_0x4d680b) {
    this.logger.level = _0x4d680b;
  }
  ['clear']() {
    a6_0x18fb25.truncate('log/app.log', 0x0, _0x2e0ce2 => {
      if (_0x2e0ce2) {
        this.logger.error("Failed to clear the log file: " + _0x2e0ce2.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();