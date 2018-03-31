'use strict'

import retry from 'p-retry';
import execa from 'execa';
import { OperationOptions } from 'retry';

import execGit from './exec-git/exec-git';
import isGitTransientError from './is-git-transient-error/is-git-transient-error';

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
 * Executes git command.
 *
 * If git command failed with not transient error, rejects `retry.AbortError`.
 *
 * @throws {retry.AbortError}
 */
const retryExecGit = async (bin:string, args:string[], execOptions:execa.Options): Promise<execa.ExecaReturns> => {
    try {
        return await execGit(bin, args, execOptions);
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
 * @param {string} [bin='git'] The name or path of the executable file to run `git`.
 * @param {string[]} [args=[]] Git command or list of git command arguments.
 * @param {OperationOptions} [retryOptions={}] Options are passed to the retry module.
 * @param {execa.Options} [execOptions={}] Options are passed to the execa module.
 * @returns {Promise<execa.ExecaReturns>}
 */
const gitRetry = async (bin:string, args:string[] = [], retryOptions:OperationOptions = {}, execOptions:execa.Options = {}): Promise<execa.ExecaReturns> => {
    const retryOpts = Object.assign({}, DEFAULT_RETRY_OPTIONS, retryOptions);

    return retry(() => retryExecGit(bin, args, execOptions), retryOpts);
};

export default gitRetry;
