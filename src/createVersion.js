export const createVersion = raw => {
    return {
        validRegEx: /^([0-9, .]+)([-+][a-z0-9]+)?$/, // Semantic Versioning 2.0
        raw
    }
}
