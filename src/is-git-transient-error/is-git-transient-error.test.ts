import isGitTransientError from './is-git-transient-error';

describe('isGitTransientError', () => {
    it('should return false if error is not transient', () => {
        const stderr = [
            'bla bla',
            'error: pathspec \'fake_branch\' did not match any file(s) known to git.',
            'bla bla'
        ].join('\n');

        expect(isGitTransientError(stderr)).toBeFalsy();
    });

    it('should support multiline', () => {
        const stderr = [
            'bla bla',
            'Connection reset by peer',
            'bla bla'
        ].join('\n');

        expect(isGitTransientError(stderr)).toBeTruthy();
    });

    describe('transient errors', () => {
        it('should return true if connection reset by peer', () => {
            const stderr = 'Connection reset by peer';

            expect(isGitTransientError(stderr)).toBeTruthy();
        });

        it('should return true if unable to look up', () => {
            const stderr = 'Unable to look up';

            expect(isGitTransientError(stderr)).toBeTruthy();
        });

        it('should return true if couldn\'t resolve host', () => {
            const stderr = 'Couldn\'t resolve host';

            expect(isGitTransientError(stderr)).toBeTruthy();
        });

        it('should return true if error in hook', () => {
            const stderr = '! [remote rejected] master -> master (error in hook)';

            expect(isGitTransientError(stderr)).toBeTruthy();
        });

        it('should return true if failed to lock', () => {
            const stderr = '! [remote rejected] master -> master (failed to lock)';

            expect(isGitTransientError(stderr)).toBeTruthy();
        });

        it('should return true if internal Server Error', () => {
            const stderr = 'remote error: Internal Server Error';

            expect(isGitTransientError(stderr)).toBeTruthy();
        });

        it('should return true if couldn\'t find remote ref', () => {
            const stderr = 'fatal: Couldn\'t find remote ref';

            expect(isGitTransientError(stderr)).toBeTruthy();
        });

        it('should return true if fetch_pack error', () => {
            const stderr = 'git fetch_pack: expected ACK/NAK, got';

            expect(isGitTransientError(stderr)).toBeTruthy();
        });

        it('should return true if bad pack header', () => {
            const stderr = 'protocol error: bad pack header';

            expect(isGitTransientError(stderr)).toBeTruthy();
        });

        it('should return true if remote end hung up unexpectedly', () => {
            const stderr = 'The remote end hung up unexpectedly';

            expect(isGitTransientError(stderr)).toBeTruthy();
        });

        it('should return true if TLS packet with unexpected length was received', () => {
            const stderr = 'TLS packet with unexpected length was received';

            expect(isGitTransientError(stderr)).toBeTruthy();
        });

        it('should return true if RPC failed', () => {
            const stderr = 'RPC failed; result=500, HTTP code = 500';

            expect(isGitTransientError(stderr)).toBeTruthy();
        });

        it('should return true if connection timed out', () => {
            const stderr = 'Connection timed out';

            expect(isGitTransientError(stderr)).toBeTruthy();
        });

        it('should return true if requested URL returned error', () => {
            const stderr = 'The requested URL returned error: 500';

            expect(isGitTransientError(stderr)).toBeTruthy();
        });
    });
});

