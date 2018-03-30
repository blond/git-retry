'use strict'

const execa = require('execa');

const DEFAULT_GIT_BIN = 'git';

/**
 * @typedef {Object} GitExecOptions Git exec options.
 *
 * @property {string}  [cwd=process.cwd()] Current working directory of the child process.
 * @property {Object}  [env=process.env] Environment key-value pairs. Extends automatically from process.env. Set extendEnv to false if you don't want this.
 * @property {boolean} [extendEnv=true] Set to false if you don't want to extend the environment variables when providing the env property.
 * @property {?number} [uid] Sets the user identity of the process.
 * @property {?number} [gid] Sets the group identity of the process.
 * @property {boolean|string} [shell=false] If true, runs command inside of a shell. Uses /bin/sh on UNIX and cmd.exe on Windows. A different shell can be specified as a string. The shell should understand the -c switch on UNIX or /d /s /c on Windows.
 * @property {boolean} [stripEof=true] Strip EOF (last newline) from the output.
 * @property {boolean} [preferLocal=true] Prefer locally installed binaries when looking for a binary to execute. If you `$ npm install my-git`, you can then gitExec('my-git').
 * @property {string}  [localDir=process.cwd()] Preferred path to find locally installed binaries in (use with preferLocal).
 * @property {string}  [encoding=utf8] Specify the character encoding used to decode the stdout and stderr output.
 * @property {number}  [timeout=0] If timeout is greater than 0, the parent will send the signal identified by the killSignal property (the default is SIGTERM) if the child runs longer than timeout milliseconds.
 * @property {number}  [maxBuffer=10000000] Largest amount of data in bytes allowed on stdout or stderr.
 * @property {boolean} [windowsVerbatimArguments=false] If true, no quoting or escaping of arguments is done on Windows. Ignored on other platforms. This is set to true automatically when the shell option is true.
 */

/**
 * Executes git command.
 *
 * @param {string|string[]} [args=[]] Git command or list of git command arguments.
 * @param {GitExecOptions} [options={}]
 * @returns {Promise<{stdout: string, stderr: string}>}
 */
module.exports = (args=[], options={}) => {
    const cmd = DEFAULT_GIT_BIN;
    const isCommand = typeof args === 'string';

    if (isCommand) {
        return execa.shell(`${cmd} ${args}`);
    }

    return execa(cmd, args);
};
