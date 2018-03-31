jest.mock('./exec-git-debug', () => {
    return {
        onStart: jest.fn(),
        onEnd: jest.fn()
    }
});
jest.mock('execa', () => {
    return jest.fn((bin, args, options) => {
        const cmd = `${bin} ${args.join(' ')}`;

        return Promise.resolve({ cmd });
    });
});

import execGit from './exec-git';

describe('execGit', () => {
    it('should exec git with args', async () => {
        const execaMock = require('execa');

        await execGit('<bin>', ['arg1', 'arg2'], { shell: true });

        expect(execaMock).toBeCalledWith('<bin>', ['arg1', 'arg2'], { shell: true });
    });

    it('should return exec git with args', async () => {
        const res = await execGit('<bin>', ['arg1', 'arg2'], { shell: true });

        expect(res).toEqual({ cmd: '<bin> arg1 arg2' });
    });

    it('should debug on start', async () => {
        const debugMock = require('./exec-git-debug');

        await execGit('<bin>', ['arg1', 'arg2'], { shell: true });

        expect(debugMock.onStart).toBeCalledWith('<bin>', ['arg1', 'arg2'], { shell: true });
    });

    it('should debug on end', async () => {
        const debugMock = require('./exec-git-debug');

        await execGit('<bin>', ['arg1', 'arg2'], { shell: true });

        expect(debugMock.onEnd).toBeCalledWith({ cmd: '<bin> arg1 arg2' });
    });
});
