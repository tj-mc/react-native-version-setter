const fs = require('fs')

export const readPackageJson = () => {
    let packageJson;
    try {
        packageJson = JSON.parse(String(fs.readFileSync('package.json')))
        if (packageJson) {
            return packageJson
        }
    } catch (e) {
        return null
    }

}
