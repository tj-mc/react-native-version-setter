import {die, out} from "./process";
import {constants} from "./constants";
const replace = require('replace-in-file');

export const mutateFiles = (locations, commandLineFlags, packageJson, version) => {
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

}

