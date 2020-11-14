/**
 * Use CLI arguments to determined the
 * correct platform constant
 */
import {constants} from "./constants";
import {out} from "./process";

export const getPlatformConstant = cliArgs => {

    if (cliArgs.iosOnly.set && cliArgs.androidOnly.set) {
        out('Adding all version flags at once has no effect.')
        return constants.platform.universal
    }

    if (cliArgs.iosOnly.set) return constants.platform.ios
    if (cliArgs.androidOnly.set) return constants.platform.ios

}
