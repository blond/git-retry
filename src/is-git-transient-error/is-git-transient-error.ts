// Retry a git operation if git returns a error response with any of these
// messages. It's all observed 'bad' GoB responses so far.
//
// This list is inspired/derived from the one in ChromiumOS's Chromite:
// <CHROMITE>/lib/git.py::GIT_TRANSIENT_ERRORS
// @see https://github.com/jamiesnape/git-retry/blob/master/git_retry.py#L17
const GIT_TRANSIENT_ERRORS = [
    'Connection reset by peer',
    'Unable to look up',
    'Couldn\\\'t resolve host',
    // crbug.com/285832
    '!.*\\[remote rejected\\].*\\(error in hook\\)',
    // crbug.com/289932
    '!.*\\[remote rejected\\].*\\(failed to lock\\)',
    // crbug.com/285832
    'remote error: Internal Server Error',
    // crbug.com/294449
    'fatal: Couldn\\\'t find remote ref',
    // crbug.com/220543
    'git fetch_pack: expected ACK\\/NAK, got',
    // crbug.com/189455
    'protocol error: bad pack header',
    // crbug.com/202807
    'The remote end hung up unexpectedly',
    // crbug.com/298189
    'TLS packet with unexpected length was received',
    // crbug.com/187444
    'RPC failed; result=\\d+, HTTP code = \\d+',
    // crbug.com/388876
    'Connection timed out',
    // crbug.com/430343
    'The requested URL returned error: 5\\d+'
];
const GIT_TRANSIENT_ERRORS_REGEXP = new RegExp(GIT_TRANSIENT_ERRORS.join('|'), 'i')

/**
 * Returns `true` if stderr contains git transient error message.
 *
 * @param {string} stderr
 * @returns {boolean}
 */
export default (stderr: string): boolean => {
    return GIT_TRANSIENT_ERRORS_REGEXP.test(stderr);
};
