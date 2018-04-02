'use strict'

import retry from 'p-retry';
import execa from 'execa';
import { OperationOptions } from 'retry';

import execGit from './exec-git/exec-git';
import isGitTransientError from './is-git-transient-error/is-git-transient-error';

const DEFAULT_RETRY_OPTIONS = {
    // The maximum amount of times to retry the operation.
    retries: 5, // means do it once, then retry it 5 times
    // The number of milliseconds before starting the first retry.
    minTimeout: 3 * 1000 // 3 second
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
const gitRetry = (bin:string, args:string[] = [], retryOptions:OperationOptions = {}, execOptions:execa.Options = {}): Promise<execa.ExecaReturns> => {
    const retryOpts = Object.assign({}, DEFAULT_RETRY_OPTIONS, retryOptions);

    return retry((x) => {
        console.log(1, x)
        return retryExecGit(bin, args, execOptions)
    });
};

export default gitRetry;
