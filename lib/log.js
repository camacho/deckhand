const moment = require('moment');
const chalk = require('chalk');

function log(msg) {
  console.log([log.timeStamp(), msg].join(' '));
}

log.chalk = chalk;

log.timeStamp = function timeStamp(date = new Date()) {
  return log.chalk.gray(`[${moment(date).format('HH:mm:ss')}]`);
};

log.error = function logError(msg) {
  log(log.chalk.yellow(msg));
};

log.success = function logSuccess(msg) {
  log(log.chalk.green(msg));
};

log.info = function logInfo(msg) {
  log(log.chalk.italic.gray(msg));
};

module.exports = log;
