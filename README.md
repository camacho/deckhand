# Deckhand

Simple task runner for Node (depends on Node >=6.0.0)

# Usage

Deckhand can be used from the command line or imported

Task Definitions
---

Tasks are intended to be an array of strings that map to files.

Tasks to be run together are grouped in arrays

Tasks to be run in sequence are concatenated strings with `!` divider

All tasks are expected to return a Promise

CLI:
---
```sh
./node_modules/.bin/deckhand <tasks..>
```

Imported:
---
```js
import Deckhand from 'deckhand';

new Deckhand([
  ['tasks/linters/css', 'tasks/linters/js', 'tasks/linters/html'],
  ['tasks/tests/unit', 'tasks/build!tasks/tests/integration']
], { cwd: __dirname });

// This will run all linters together
// Then will run all tests together
// It will also make sure to complete the build task before running integration
```
