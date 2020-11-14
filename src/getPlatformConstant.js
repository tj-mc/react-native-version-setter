import {constants} from "./constants";
import {out} from "./process";

/**
 * Convert CLI arguments to a constant string
 * @param cliArgs
 * @returns {string}
 */
export const getPlatformConstant = cliArgs => {

    if (cliArgs.iosOnly.set && cliArgs.androidOnly.set) {
        out('Adding all version flags at once has no effect.')
        return constants.platform.universal
    }

    if (cliArgs.iosOnly.set) return constants.platform.ios
    if (cliArgs.androidOnly.set) return constants.platform.android

}
