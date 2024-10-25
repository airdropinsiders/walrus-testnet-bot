  import { createLogger, format, transports } from 'winston';
  import a6_0x59c293 from 'fs';
  const {
    combine,
    timestamp,
    printf,
    colorize
  } = format;
  const customFormat = printf(({
    level: _0x5047c4,
    message: _0x130ed0,
    timestamp: _0x215473
  }) => {
    return _0x215473 + " [" + _0x5047c4 + "]: " + _0x130ed0;
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
          'filename': 'log/app.log'
        })]
      });
    }
    ['info'](_0x4aaa82) {
      this.logger.info(_0x4aaa82);
    }
    ['warn'](_0x5005d6) {
      this.logger.warn(_0x5005d6);
    }
    ["error"](_0x22867c) {
      this.logger.error(_0x22867c);
    }
    ["debug"](_0x321391) {
      this.logger.debug(_0x321391);
    }
    ["setLevel"](_0x102047) {
      this.logger.level = _0x102047;
    }
    ["clear"]() {
      a6_0x59c293.truncate('log/app.log', 0x0, _0x107f2c => {
        if (_0x107f2c) {
          this.logger.error("Failed to clear the log file: " + _0x107f2c.message);
        } else {
          this.logger.info("Log file cleared");
        }
      });
    }
  }
  export default new Logger();
