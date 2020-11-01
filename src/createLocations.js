import {constants} from './constants'

export const createLocations = (version, packageJson, platform = null) => {

    const allLocations = [
        {
            files: './android/app/build.gradle',
            from: new RegExp('versionCode [0-9]+', 'g'),
            to: `versionCode ${version.stripped}`,
            platform: constants.platform.android
        },
        {
            files: './android/app/build.gradle',
            from: new RegExp('versionName "[0-9, .]+"', 'g'),
            to: `versionName "${version.raw}"`,
            platform: constants.platform.android
        },
        {
            files: `./ios/${packageJson.name}.xcodeproj/project.pbxproj`,
            from: new RegExp('MARKETING_VERSION = [0-9, .]+', 'g'),
            to: `MARKETING_VERSION = ${version.raw}`,
            platform: constants.platform.ios
        },
        {
            files: `./package.json`,
            from: new RegExp('"version": ".+"'),
            to: `"version": "${version.raw}"`,
            platform: constants.platform.universal
        },
    ]

    /**
     * If a platform was passed, find the locations for that platform.
     */
    switch (platform) {
        case constants.platform.android:
            return allLocations.filter(location => location.platform === constants.platform.android)
        case constants.platform.ios:
            return allLocations.filter(location => location.platform === constants.platform.ios)
        default:
            return allLocations
    }

}
