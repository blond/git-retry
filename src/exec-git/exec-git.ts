import execa from 'execa';

import gitDebug from './exec-git-debug';

const DEFAULT_GIT_BIN = 'git';

/**
 * Executes git command.
 *
 * @param {string[]} [args=[]] Arguments of git command.
 * @param {execa.Options} [options={}] Git command or list of git command arguments.
 * @returns {execa.ExecaChildPromise}
 */
export default async (bin:string = DEFAULT_GIT_BIN, args:string[] = [], options:execa.Options = {}): Promise<execa.ExecaReturns> => {
    gitDebug.onStart(bin, args, options);

    const res = await execa(bin, args, options);

    gitDebug.onEnd(res);

    return res;
};
