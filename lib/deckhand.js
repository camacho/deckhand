// Tasks are described by the name of the task file (./tasks/<name>)
// Tasks in arrays are run in parallel
// Tasks separated by ! are run sequentially

const path = require('path');
const log = require('./log');
const moment = require('moment');
const spawn = require('child_process').spawn;

const defaults = {
  cwd: process.cwd(),
  runner: 'node',
  singleProcess: false,
};

class Deckhand {
  constructor(tasks, options = {}) {
    this.options = Object.assign({}, defaults, options);
    return this.runSequentialTasks(tasks);
  }

  run(filename) {
    let start;
    const file = path.resolve(this.options.cwd, filename);

    const options = {
      cwd: this.options.cwd,
      stdio: [null, process.stdout, process.stderr],
    };

    let startMessage = `Starting '${log.chalk.bold.green(filename)}'`;

    if (this.options.runner !== defaults.runner) {
      startMessage += ` using ${log.chalk.bold.green(this.options.runner)}`;
    }

    return new Promise((resolve, reject) => {
      log(`${startMessage}...`);

      start = new Date();

      if (this.options.singleProcess) {
        const fn = require(file);

        if (typeof fn !== 'function') {
          resolve();
        } else if (fn.length >= 1) {
          // eslint-disable-next-line no-confusing-arrow
          fn((err) => (err) ? reject(err) : resolve());
        } else {
          Promise.all([require(file)()]).then(resolve, reject);
        }

        return;
      }

      const child = spawn(this.options.runner, [file], options);

      child.on('error', reject);

      child.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error('Process failed'));
        } else {
          resolve();
        }
      });
    }).then(() => {
      const end = new Date();
      const duration = end.getTime() - start.getTime();

      log([
        `Finished '${log.chalk.bold.green(filename)}' after`,
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
