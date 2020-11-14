/**
 * Replacer function to strip beta/rc from ios versions.
 * Strips away second match.
 * @param match
 * @param p1
 * @param p2
 * @param offset
 * @param string
 * @return {*}
 */
export const coreReplacer = (match, p1, p2, offset, string) => p1
