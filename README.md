# Deckhand

Simple task runner for Node (depends on Node >=6.0.0)

# Usage

Deckhand can be used from the command line or imported

Task Definitions
---

Tasks are intended to be an array of strings that map to files.

Tasks to be run together are grouped in arrays

Tasks to be run in sequence are concatenated strings with `!` divider

All tasks are run in their own child processes, unless specified otherwise

Tasks run in the parent process can either return a Promise or
accept a callback to be called on completion

CLI:
---
```sh
./node_modules/.bin/deckhand <tasks..>
```

Available CLI options can be seen by running:

```sh
./node_modules/.bin/deckhand -h
```

Imported:
---
```js
import Deckhand from 'deckhand';

new Deckhand([
  ['tasks/linters/css', 'tasks/linters/js', 'tasks/linters/html'],
  ['tasks/tests/unit', 'tasks/build!tasks/tests/integration']
], { cwd: __dirname, runner: 'babel-node' });

// This will run all linters together
// Then will run all tests together
// It will also make sure to complete the build task before running integration
// All tasks will be run in child processes using `babel-node`
```

A Deckhand constructor takes two arguments:
1) Array of tasks
2) Options object

The following options are available (with their defaults):
* cwd (process.cwd) - the cwd for resolving files and running tasks
* runner ('node') - the runner to use for running tasks in child processes
* singleProcess (false) - flag to run all tasks in the parent process
