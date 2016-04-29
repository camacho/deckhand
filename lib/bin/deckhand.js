#!/usr/bin/env node
const argv = require('yargs')
  .usage('Usage: $0 <tasks..> -d [dir]')
  .command('run <tasks..>', 'run one or more tasks by file location')
  .alias('d', 'dir')
  .default('d', process.cwd())
  .describe('d', 'directory from which to resolve all task paths')
  .alias('v', 'version')
  .version(() => require('../../package').version)
  .describe('v', 'show version information')
  .alias('h', 'help')
  .help('help')
  .argv;

const Deckhand = require('../deckhand');
const log = require('../log');

const tasks = argv.tasks || argv._;

if (tasks && tasks.length) {
  new Deckhand(tasks, { cwd: argv.d }).catch((err) => {
    log.error(err);
    process.exit(1);
  });
} else {
  log.error('No task specified');
}
