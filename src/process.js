export const out = message => {
    console.log(`[RNVS] ${message}`)
}

export const die = message => {
    out(message)
    process.exit(1)
}

export const cliArgumentExists = flag => {
    return !!process.argv.find(arg => arg === flag)
}
