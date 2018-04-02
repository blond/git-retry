import gitDebug from './exec-git-debug';

describe('gitDebug', () => {
    describe('_buildStartMessage()', () => {
        it('should build start message with empty args', () => {
            const message = gitDebug._buildStartMessage('/path/to/git', []);

            expect(message).toBe('Executing "/path/to/git" with options: %o');
        });

        it('should build start message with args', () => {
            const message = gitDebug._buildStartMessage('/path/to/git', ['pull', '--all']);

            expect(message).toBe('Executing "/path/to/git pull --all" with options: %o');
        });
    });

    describe('_buildEndMessage()', () => {
        it('should build end message if process is succesed', () => {
            const execRes = {
                cmd: '<cmd>', code: 0, failed: false,
                killed: false, signal: null, timedOut: false,
                stdout: '', stderr: ''
            };

            const message = gitDebug._buildEndMessage(execRes);

            expect(message).toBe('The command "<cmd>" is finished with exit code 0');
        });

        it('should build end message if process is failed', () => {
            const execRes = {
                cmd: '<cmd>', code: 1, failed: true,
                killed: false, signal: null, timedOut: false,
                stdout: '', stderr: ''
            };

            const message = gitDebug._buildEndMessage(execRes);

            expect(message).toBe('The command "<cmd>" is failed with exit code 1');
        });

        it('should build end message if process is killed', () => {
            const execRes = {
                cmd: '<cmd>', code: 1, failed: true,
                killed: true, signal: '<signal>', timedOut: false,
                stdout: '', stderr: ''
            };

            const message = gitDebug._buildEndMessage(execRes);

            expect(message).toBe('The command "<cmd>" is failed with exit code 1. Process was killed with signal "<signal>"');
        });

        it('should build end message if process is time out', () => {
            const execRes = {
                cmd: '<cmd>', code: 1, failed: true,
                killed: false, signal: null, timedOut: true,
                stdout: '', stderr: ''
            };

            const message = gitDebug._buildEndMessage(execRes);

            expect(message).toBe('The command "<cmd>" is failed with exit code 1. Process timed out');
        });
    });
});

