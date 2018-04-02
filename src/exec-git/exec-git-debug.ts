import debug from 'debug';
import execa from 'execa';

const gitDebug = debug('git-retry:exec-git');

/**
 * Returns debug message about executing git process.
 */
const _buildStartMessage = (bin:string, args:string[]): string => {
    const argsStr = args.length > 0 ? ' ' + args.join(' ') : '';

    return `Executing "${bin}${argsStr}" with options: %o`;
};

/**
 * Returns debug message about executed git process.
 */
const _buildEndMessage = ({ cmd, code, failed, killed, signal, timedOut }: execa.ExecaReturns): string => {
    let message = `The command "${cmd}" is ${failed ? 'failed' : 'finished'} with exit code ${code}`;

    if (killed) {
        message += `. Process was killed with signal "${signal}"`;
    }

    if (timedOut) {
        message += `. Process timed out`;
    }

    return message;
};

/**
 * Debug message on starting git process.
 */
const onStart = (bin:string, args:string[], options: execa.Options) => {
    const message = _buildStartMessage(bin, args);

    gitDebug(message, options);
};

/**
 * Debug message on finished git process.
 */
const onEnd = (execRes: execa.ExecaReturns) => {
    const message = _buildEndMessage(execRes);

    gitDebug(message);
};

export default {
    _buildStartMessage,
    _buildEndMessage,
    onStart,
    onEnd
};
