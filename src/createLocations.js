export const createLocations = ({version, packageJson}) => {
    return [
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
}
