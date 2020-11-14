import {cliArgumentExists} from "../lib/process";

const flags = [
    {
        name: 'debugLog',
        argument: '-d'
    },
    {
        name: 'dryRun',
        argument: '-r'
    },
    {
        name: 'iosOnly',
        argument: '-ios'
    },
    {
        name: 'androidOnly',
        argument: '-android'
    }
]

export const createCliFlags = () => {

    const args = {}

    flags.forEach(flag => {
        args[flag.name] = {
            argument: flag.argument,
            set: cliArgumentExists(flag.argument)
        }
    })

    return args
}
