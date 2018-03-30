'use strict'

const retry = require('p-retry');

const execGit = require('./exec-git');
const isGitTransientError = require('./is-git-transient-error');

const DEFAULT_RETRY_OPTIONS = {
    retries: 5,
    minTimeout: 1 * 1000, // 1 second
    maxTimeout: 3 * 1000, // 3 second
    maxRetryTime: Infinity,
    randomize: false,
    forever: false,
    unref: false
};

/**
 * @typedef {Object} RetryOptions Options are passed to the retry module
 *
 * @property {number}  [retries=5] The maximum amount of times to retry the operation.
 * @property {number}  [factor=2] The exponential factor to use.
 * @property {number}  [minTimeout=1000] The number of milliseconds before starting the first retry.
 * @property {number}  [maxTimeout=3000] The maximum number of milliseconds between two retries.
 * @property {number}  [maxRetryTime=Infinity] The maximum time (in milliseconds) that the retried operation is allowed to run.
 * @property {boolean} [randomize=false] Randomizes the timeouts by multiplying a factor between 1-2.
 * @property {boolean} [forever=false] Whether to retry forever.
 * @property {boolean} [unref=false] Whether to unref the setTimeout's.
 */

/**
 * Executes git command.
 *
 * If git command failed with not transient error, rejects `retry.AbortError`.
 *
 * @param {string|string[]} [args=[]] Git command or list of git command arguments.
 * @param {GitExecOptions} [execOptions={}] Options are passed to the exec module.
 * @returns {Promise<{stdout: string, stderr: string}>}
 * @throws {retry.AbortError}
 */
const retryExecGit = async (args=[], execOptions={}) => {
    try {
        return await execGit(args, execOptions);
    } catch (err) {
        const { stderr } = err;

        if (!(stderr && isGitTransientError(stderr))) {
            throw new retry.AbortError(err);
        }

        throw err;
    }
};

/**
 * Executes git command.
 *
 * @param {string|string[]} [args=[]] Git command or list of git command arguments.
 * @param {RetryOptions} [retryOptions={}] Options are passed to the retry module.
 * @param {GitExecOptions} [execOptions={}] Options are passed to the exec module.
 * @returns {Promise<{stdout: string, stderr: string}>}
 */
module.exports = async (args=[], retryOptions={}, execOptions={}) => {
    const retryOpts = Object.assign({}, DEFAULT_RETRY_OPTIONS, retryOptions);

    return retry(() => retryExecGit(args, execOptions), retryOpts);
};
