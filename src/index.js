#!/usr/bin/env node

const replace = require('replace-in-file');
const fs = require('fs');

const out = message => console.log(`[RNVS] ${message}`)
const die = message => { out(message); process.exit(1); }
const getArg = flag => process.argv.find(arg => arg === flag)

const emoji = {
    warning: String.fromCodePoint(0x1F6D1),
    check: String.fromCodePoint(0x2705),
    sparkle: String.fromCodePoint(0x2728)
}

const prefs = {
    debugLog: {
        flag: '-d',
        set: null
    }
}

Object.keys(prefs).forEach(key => {
    prefs[key].set = getArg(prefs[key].flag)
})

const version = {
    valid: /^[0-9, .]+[0-9]+$/,
    raw: process.argv[2]
}

version.raw || die(`Please provide a version number. ${emoji.warning}`);
version.valid.test(version.raw) || die(`Your version number should contain only digits and periods. ${emoji.warning} `)
version.stripped = version.raw.split('.').join('')

let packageJson;
try {
    packageJson = JSON.parse(String(fs.readFileSync('package.json')))
} catch (e) {
    die(`Could not read package.json: ${e}`)
}

const locations = [
    {
        files: './android/app/build.gradle',
        from: new RegExp('versionCode [0-9]+', 'g'),
        to: `versionCode ${version.stripped}`,
    },
    {
        files: './android/app/build.gradle',
        from: new RegExp('versionName "[0-9, .]+"', 'g'),
        to: `versionName "${version.raw}"`,
    },
    {
        files: `./ios/${packageJson.name}.xcodeproj/project.pbxproj`,
        from: new RegExp('MARKETING_VERSION = [0-9, .]+', 'g'),
        to: `MARKETING_VERSION = ${version.raw}`,
    },
    {
        files: `./package.json`,
        from: new RegExp('"version": ".+"'),
        to: `"version": "${version.raw}"`,
    },
]

let changes = 0;

try {
    locations.forEach(location => {

        const result = replace.sync(location)

        result[0]?.file || out(`Could not find file: ${location.files} ${emoji.warning} `)

        if (result[0]?.hasChanged) {
            changes++
            prefs.debugLog.set && out(`Set ${location.files} to:  ${location.to} `)
        } else {
            prefs.debugLog.set && out(`${location.files} was not changed.`)
        }

    })


    if (locations.length > changes && changes !== 0) {
        out(`One or more files were not changed. Run with -d flag for debug log. ${emoji.warning}` )
    } else if (changes === 0) {
        if (packageJson.version === version.raw) {
            out(`Version is already ${version.raw} ${emoji.warning}  `)
        } else {
            out(`No files changed. Run with -d flag for debug log. ${emoji.warning} `)
        }
    } else if (changes === locations.length) {
        out(`${packageJson.name}: ${packageJson.version}: ==> ${version.raw} ${emoji.check} `)
    }

} catch (e) {
    die(e)
}

