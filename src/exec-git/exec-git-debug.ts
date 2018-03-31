import debug from 'debug';
import execa from 'execa';

const gitDebug = debug('git-retry:exec-git');

/**
 * Returns debug message about executing git process.
 */
const buildStartMessage = (bin:string, args:string[]): string => {
    return `Executing "${bin} ${args.join(' ')}" with options: %o`;
};

/**
 * Returns debug message about executed git process.
 */
const buildEndMessage = ({ cmd, code, killed, signal, timedOut }: execa.ExecaReturns): string => {
    let message = `The command "${cmd}" is finished with exit code ${code}.`;

    if (killed) {
        message += ` Process was killed with signal ${signal}.`;
    }

    if (timedOut) {
        message += ` Process timed out.`;
    }

    return message;
};

/**
 * Debug message on starting git process.
 */
const onStart = (bin:string, args:string[], options: execa.Options) => {
    const message = buildStartMessage(bin, args);

    gitDebug(message, options);
};

/**
 * Debug message on finished git process.
 */
const onEnd = (execRes: execa.ExecaReturns) => {
    const message = buildEndMessage(execRes);

    gitDebug(message);
};

export default {
    buildStartMessage,
    buildEndMessage,
    onStart,
    onEnd
};
