/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

import bunyan from 'bunyan';

const LOG_LEVEL = 'info';

class ConsoleLogTextStream {
  static extractLogData(rec) {
    const data = {
      ...rec,
    };

    // Deleting bunyan meta properties so that only custom log message properties are included
    delete data.name;
    delete data.pid;
    delete data.msg;
    delete data.time;
    delete data.v;
    delete data.level;
    delete data.hostname;

    return data;
  }

  write(recordJson) {
    const record = JSON.parse(recordJson);

    const time = record.time;
    const level = bunyan.nameFromLevel[record.level];
    const message = record.msg;
    const data = JSON.stringify(ConsoleLogTextStream.extractLogData(record));

    console.log('[%s] %s: %s. %s', time, level, message, data);
  }
}

const logger = bunyan.createLogger({
  name: 'octobiwan',
});

// Can't pipe logs to bunyan formatter when using Heroku, so have to format logs to text
// manually to get understandable logging
if (process.env.NODE_ENV === 'production') {
  logger.streams = [
    {
      level: LOG_LEVEL,
      stream: new ConsoleLogTextStream(),
      type: 'raw',
    },
  ];
}

logger.level(LOG_LEVEL);

export default logger;
