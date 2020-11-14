import {die, out} from "./process";

const fs = require('fs')

export const readConfig = commandLineFlags => {

    let config
    try {
        config = String(fs.readFileSync('.rnvs.json'))
    } catch (e) {
        return {}
    }

    try {
        config = JSON.parse(config)
        commandLineFlags.debugLog.set && out("Using config file.")
        return config
    } catch (e) {
        die('Error reading .rnvs.json file.')
    }

}
