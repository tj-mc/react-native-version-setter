#!/usr/bin/env node
import {die, logDie} from "./process.js";
import {readPackageJson} from "./readPackageJson.js";
import {createLocations} from "./createLocations.js";
import {getPlatformConstant} from "./getPlatformConstant";
import {createVersion} from "./createVersion";
import {mutateFiles} from "./mutateFiles";
import {createCliFlags} from "./createCliFlags";

// Read package.json
const packageJson = readPackageJson() || die('Could not read package.json.')

// Create and check for all CLI flags
const commandLineFlags = createCliFlags()

// Create the version object
const version = createVersion(process.argv[2])

// Use CLI args to determine the correct platform constant
const platform = getPlatformConstant(commandLineFlags)

// Get locations for specified version, or all if no version is specified
const locations = createLocations(version, packageJson, platform)

// If dryRun is set, just print versions
commandLineFlags.dryRun.set && logDie(version, 'No changes applied.')

// Make the file mutations
mutateFiles(locations, commandLineFlags, packageJson, version)
