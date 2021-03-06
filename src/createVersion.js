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

    // Code is the Android versionCode where we generate an int from the semantic version
    // Inspired by this: https://gist.github.com/dekalo-stanislav/9ad5f76cc2b49828acbf0634f6586b6c
    version.code = versionCode(version.raw);

    return version
}

/**
 * Here is representation of Version code generation from version name.
 * - Note that 1.23.1-alpha1 and 1.23.1-alpha2 will share the same versionCode.
 * - We do not have room for type-numbers
 *
 *  *--------- major version
 *  |  *------ minor version
 *  |  |  *--- patch version
 *  |  |  |*-- buildType (dev/alpha/beta/rc/release)
 *  |  |  |||
 *  X00X00XXX
 * so
 *  1.13.20-alpha-v19 = 10130201
 * see details below:
 *  *--------- 1 is major version
 *  |  *------ 13 is minor version
 *  |  |  *--- 20 is patch version
 *  |  |  |*-- type 1 is alpha.
 *  |  |  ||*- flavor 0 (disabled)
 *  |  |  |||
 *  101302010
 */
function versionCode(rawVersion) {

    const typeDigit = 1;
    const patchDigit = typeDigit * 10;
    const minorDigit = patchDigit * 1000;
    const majorDigit = minorDigit * 1000;

    const [mainPart, typeStr] = rawVersion.split("-")
    const dotSplit = mainPart.split('.');
    const major = Number(dotSplit[0]);
    const minor = Number(dotSplit[1]);
    const patch = Number(dotSplit[2]);

    let type = 9; // Defaults to relase if nothing defined
    if (typeStr) {
        if (typeStr.match(/^alpha/i)) {
            type = 1;
        }
        if (typeStr.match(/^beta/i)) {
            type = 2;
        }
        if (typeStr.match(/^rc/i)) {
            type = 3;
        }
        // Leaves room for other build-types, but release is highest (9)
    }

    console.log("typestr", typeStr)

    console.log(dotSplit)

    const out = (major * majorDigit) + (minor * minorDigit) + (patch * patchDigit) + (type * typeDigit);
    if (out > 2100000000) { // Reference: https://medium.com/dipien/versioning-android-apps-d6ec171cfd82
        throw new Error("versionCode is larger than Google Play allows")
    }
    return out
}
