import {die} from "./process";
import {constants} from "./constants";
import {coreReplacer} from "./coreReplacer";

export const createVersion = raw => {
    const version = {
        validRegEx: /^([0-9, .]+)([-+][a-z0-9]+)?$/, // Semantic Versioning 2.0
        raw
    }

    // Validate version strings
                            version.raw  || die(`Please provide a version number. ${constants.emoji.warning}`)
    version.validRegEx.test(version.raw) || die(`Usage: setVersion <version> [args] ${constants.emoji.warning} `)

    // The core string contains no extended semVer symbols. Eg, 1.1.1 format only.
    version.core = version.raw.replace(version.validRegEx, coreReplacer)

    // Stripped is the core string without periods
    version.stripped = version.core.split('.').join('')

    return version
}
