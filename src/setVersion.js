#!/usr/bin/env node
import {out, die, cliArgumentExists} from "./process.js";
import {readPackageJson} from "./readPackageJson.js";
import {createLocations} from "./createLocations.js";
import {constants} from "./constants";
import {getPlatformConstant} from "./getPlatformConstant";
import {coreReplacer} from "./coreReplacer";
const replace = require('replace-in-file');

const packageJson = readPackageJson()
packageJson || die('Could not read package.json.')


// All possible command line flags
const commandLineFlags = {
    debugLog: {
        argument: '-d',
        set: false
    },
    dryRun: {
        argument: '-r',
        set: false
    },
    iosOnly: {
        argument: '-ios',
        set: false
    },
    androidOnly: {
        argument: '-android',
        set: false
    }
}

// Loop through the commandLineFlags array,
// searching for a symbol in the command line
Object.keys(commandLineFlags).forEach(key => {
    commandLineFlags[key].set = cliArgumentExists(commandLineFlags[key].argument)
})

const version = {
    validRegEx: /^([0-9, .]+)([-+][a-z0-9]+)?$/, // Semantic Versioning 2.0
    raw: process.argv[2]              // The raw input version string
}

// Validate version strings
version.raw || die(`Please provide a version number. ${constants.emoji.warning}`)
version.validRegEx.test(version.raw) || die(`Usage: setVersion <version> [args] ${constants.emoji.warning} `)

// The core string contains to extended semVer symbols. Eg, 1.1.1 format only.
version.core = version.raw.replace(version.validRegEx, coreReplacer)

// Stripped is the core string without periods
version.stripped = version.core.split('.').join('')

if (commandLineFlags.dryRun.set) {
    console.log(version)
    die('No changes applied.')
}

// Use CLI args to determine the correct platform constant
const platform = getPlatformConstant(commandLineFlags)

// Get locations for specified version, or all if no version is specified
const locations = createLocations(version, packageJson, platform)

let changes = 0

try {
    locations.forEach(location => {

        const result = replace.sync(location)

        result[0]?.file || out(`Could not find file: ${location.files} ${constants.emoji.warning} `)

        if (result[0]?.hasChanged) {
            changes++
            commandLineFlags.debugLog.set && out(`Set ${location.files} to:  ${location.to} `)
        } else {
            commandLineFlags.debugLog.set && out(`${location.files} was not changed.`)
        }

    })

    if (locations.length > changes && changes !== 0) {
        out(`One or more files were not changed. Run with -d flag for debug log. ${constants.emoji.warning}`)
    } else if (changes === 0) {
        if (packageJson.version === version.raw) {
            out(`Version is already ${version.raw} ${constants.emoji.warning}  `)
        } else {
            out(`No files changed. Run with -d flag for debug log. ${constants.emoji.warning} `)
        }
    } else if (changes === locations.length) {
        out(`${packageJson.name}: ${packageJson.version}: ==> ${version.raw} ${constants.emoji.check} `)
    }

} catch (e) {
    die(e)
}

