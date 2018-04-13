import bunyan from './bunyanLogger';

const bunyanLog = (level, message, data) => {
  if (data) {
    bunyan[level](data, message);
  } else {
    bunyan[level](message);
  }
};

class Logger {
  /**
   * Log verbose information for debug or tracing purposes
   * @param {String} message The info message to log
   * @param {Object} data Optional extra data to log with the info message
   */
  static debug(message, data) {
    bunyanLog('debug', message, data);
  }

  /**
   * Log information about user actions and important events etc
   * @param {String} message The warning message to log
   * @param {Object} data Optional extra data to log with the warning message
   */
  static info(message, data) {
    bunyanLog('info', message, data);
  }

  /**
   * Log important deviations or unexpected events which should be fixed but are not critical
   * @param {String} message The text message to log
   * @param {Object} data Optional extra data to log with the message
   */
  static warning(message, data) {
    bunyanLog('warning', message, data);
  }

  /**
   * Log errors that made the current request or workflow fail
   * @param {String} message The error message to log
   * @param {Object} data Optional extra data to log with the error message
   */
  static error(message, data) {
    bunyanLog('error', message, data);
  }

  /**
   * Log critical errors tha made the application fail and not recover
   * @param {String} message The fatal error message
   * @param {Object} data Optional extra data to log with the fatal error message
   */
  static fatal(message, data) {
    bunyanLog('fatal', message, data);
  }
}

export default Logger;
