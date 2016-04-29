// Tasks are described by the name of the task file (./tasks/<name>)
// Tasks in arrays are run in parallel
// Tasks separated by ! are run sequentially

const path = require('path');
const log = require('./log');
const moment = require('moment');

class Deckhand {
  constructor(tasks, options = {}) {
    this.cwd = options.cwd || process.cwd();
    return this.runSequentialTasks(tasks);
  }

  run(filename) {
    const start = new Date();

    let fn;

    if (typeof filename === 'function') {
      fn = filename;
    } else {
      fn = require(path.resolve(this.cwd, filename));
    }

    log(`Starting '${log.chalk.bold.green(fn.name)}'...`);
    return Promise.all([fn()]).then(() => {
      const end = new Date();
      const duration = end.getTime() - start.getTime();

      log([
        `Finished '${log.chalk.bold.green(fn.name)}' after`,
        log.chalk.bold.green(`${moment.duration(duration).as('seconds')}s`),
      ].join(' '));
    });
  }

  runSequentialTasks(tasks) {
    const tasksArray = Array.isArray(tasks) ? tasks : [tasks];

    return tasksArray.reduce((promise, filename) => {
      const job = Array.isArray(filename) ? this.processTask : this.run;
      return promise.then(job.bind(this, filename));
    }, Promise.resolve());
  }

  processTask(task) {
    let promise;

    if (Array.isArray(task)) {
      // Run all of these tasks in parallel
      promise = Promise.all(task.map(this.processTask.bind(this)));
    } else if (typeof task === 'string') {
      // Run all tasks with '!' sequentially
      promise = this.runSequentialTasks(task.split('!'));
    } else {
      promise = this.run(task);
    }

    return promise;
  }
}

module.exports = Deckhand;
