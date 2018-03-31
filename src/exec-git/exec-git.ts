import execa from 'execa';

import gitDebug from './exec-git-debug';

/**
 * Executes git command.
 *
 * @param {string} [bin='git'] The name or path of the executable file to run `git`.
 * @param {string[]} [args=[]] Arguments of git command.
 * @param {execa.Options} [options={}] Git command or list of git command arguments.
 * @returns {execa.ExecaChildPromise}
 */
export default async (bin:string, args:string[], options:execa.Options): Promise<execa.ExecaReturns> => {
    gitDebug.onStart(bin, args, options);

    const res = await execa(bin, args, options);

    gitDebug.onEnd(res);

    return res;
};
