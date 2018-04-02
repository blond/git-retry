import gitRetry from './git-retry';
import execGit from './exec-git/exec-git';
import isGitTransientError from './is-git-transient-error/is-git-transient-error';

jest.mock('./exec-git/exec-git');
jest.mock('./is-git-transient-error/is-git-transient-error');

describe('git-retry', () => {
    beforeEach(() => {
        execGit.mockRejectedValue('<error>');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should exec git', async () => {
        execGit.mockResolvedValue('<done>');

        await gitRetry('<bin>', ['arg1', 'arg2'], { retries: 5 }, { shell: true });

        expect(execGit).toBeCalledWith('<bin>', ['arg1', 'arg2'], { shell: true });
    });

    it.only('should retry transient error', async () => {
        const error = new Error('transient-error');
        error.stderr = '<transient-error>';

        execGit.mockRejectedValue(error);
        isGitTransientError.mockReturnValue(true);

        await gitRetry('<bin>', ['arg1', 'arg2'], { retries: 2 }, { shell: true });

        expect(execGit).toHaveBeenCalledTimes(3);
    });
});
