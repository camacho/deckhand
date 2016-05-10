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
  .alias('r', 'runner')
  .describe('r', 'node (or node like) runner to be used')
  .default('r', 'node')
  .alias('s', 'single-process')
  .describe('s', 'run all tasks in single process')
  .default('s', 'false')
  .boolean('s')
  .help('help')
  .argv;

const Deckhand = require('../deckhand');
const log = require('../log');

const tasks = argv.tasks || argv._;
const options = { cwd: argv.d, runner: argv.r, singleProcess: argv.s };

if (tasks && tasks.length) {
  new Deckhand(tasks, options).catch((err) => {
    log.error(err);
    process.exit(1);
  });
} else {
  log.error('No task specified');
}
