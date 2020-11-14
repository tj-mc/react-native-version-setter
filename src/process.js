export const out = message => {
    console.log(`[RNVS] ${message}`)
}

export const die = message => {
    out(message)
    process.exit(1)
}

export const logDie = (message, dieMessage) => {
    console.log(message)
    die(dieMessage)
}

export const cliArgumentExists = flag => !!process.argv.find(arg => arg === flag)
