#!/usr/bin/env node
import {die} from "./process.js";
import {readPackageJson} from "./readPackageJson.js";
import {createLocations} from "./createLocations.js";
import {constants} from "./constants";
import {getPlatformConstant} from "./getPlatformConstant";
import {coreReplacer} from "./coreReplacer";
import {createVersion} from "./createVersion";
import {mutateFiles} from "./mutateFiles";
import {createCliFlags} from "./createCliFlags";

// Read package.json
const packageJson = readPackageJson() || die('Could not read package.json.')

// Create and check for all CLI flags
const commandLineFlags = createCliFlags()

// Create the version object
const version = createVersion(process.argv[2])

// Validate version strings
                        version.raw  || die(`Please provide a version number. ${constants.emoji.warning}`)
version.validRegEx.test(version.raw) || die(`Usage: setVersion <version> [args] ${constants.emoji.warning} `)

// The core string contains to extended semVer symbols. Eg, 1.1.1 format only.
version.core = version.raw.replace(version.validRegEx, coreReplacer)

// Stripped is the core string without periods
version.stripped = version.core.split('.').join('')

// Use CLI args to determine the correct platform constant
const platform = getPlatformConstant(commandLineFlags)

// Get locations for specified version, or all if no version is specified
const locations = createLocations(version, packageJson, platform)

// If dryRun is set, just print versions
if (commandLineFlags.dryRun.set) { console.log(version); die('No changes applied.') }

// Make the file mutations
mutateFiles(locations, commandLineFlags, packageJson, version)
