git-retry
=========

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Windows Status][appveyor-img]][appveyor]
[![Coverage Status][coverage-img]][coveralls]
[![Dependency Status][david-img]][david]

[npm]:          https://www.npmjs.org/package/git-retry
[npm-img]:      https://img.shields.io/npm/v/git-retry.svg

[travis]:       https://travis-ci.org/blond/git-retry
[test-img]:     https://img.shields.io/travis/blond/git-retry/master.svg?label=tests

[appveyor]:     https://ci.appveyor.com/project/blond/git-retry
[appveyor-img]: https://img.shields.io/appveyor/ci/blond/git-retry/master.svg?label=windows

[coveralls]:    https://coveralls.io/r/blond/git-retry
[coverage-img]: https://img.shields.io/coveralls/blond/git-retry/master.svg

[david]:        https://david-dm.org/blond/git-retry
[david-img]:    https://img.shields.io/david/blond/git-retry/master.svg


`git-retry` is a bootstrap that wraps a standard git command execution in a fault-tolerant retry wrapper. 

If a retry succeeds, the `stdout` and `stderr` of successful attempt is returned. Otherwise, the rejects that occured most frequently. The wrapper is aware of git-specific failure conditions and will only consider retrying if a given failure can be linked to such a condition.

Install
-------

```
$ npm install --save git-retry
```

Usage
-----

```js
const gitRetry = require('git-retry');

gitRetry('pull --all', { retries: 5 })
    .then(({ stdout, stderr }) => console.log(`git pulled, see log: ${stdout}`))
    .catch(() => console.error('git failed'));
```

API
---

### gitRetry(command, [retryOptions[, execOptions]])

Executes git command.

### command

Type: `string|string[]`

Git command or list of git command arguments.

### retryOptions

Type: `Object`

Options are passed to the [`retry`](https://github.com/tim-kos/node-retry#retryoperationoptions) module.

### execOptions

Type: `Object`

Options are passed to the [`exec`](https://github.com/sindresorhus/execa#options) module.

License
-------

MIT © [Andrew Abramov](https://github.com/blond)
