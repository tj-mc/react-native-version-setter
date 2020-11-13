const fs = require('fs')

export const readPackageJson = () => {
    let packageJson;
    try {
        packageJson = JSON.parse(String(fs.readFileSync('package.json')))
        if (packageJson) {
            return packageJson
        } else {
            throw new Error()
        }
    } catch (e) {
        return null
    }

}
