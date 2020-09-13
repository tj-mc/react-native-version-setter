#react-native-version-setter

![rnvs logo](./rnvs.png)
The simplest way to update your app version.

Will auto update:
```
android/app/build.gradle versionName
android/app/build.gradle versionCode
ios/{projectName}.xcodeproj/project.pbxproj MARKETING_VERSION
package.json "version"
```

## Install
```npm i react-native-version-setter```

## Usage
```
$: npm run setVersion 1.2.0
[RNVS] MyApp: 1.0.0: ==> 1.2.0 ✅ 

$: npm run setVersion 1.2.0
[RNVS] Version is already 1.2.0 🛑
```

## Freeform Versioning
react-native-version-setter does not impose restrictions on versioning style. 
Feel free set your version numbers in whatever format works for you. For example, Date-based versioning:
```
$: npm run setVersion 1.20200909.1
[RNVS] MyApp: 1.0.0: ==> 1.20200909.1 ✅ 
```
In most cases it makes sense to use conventional [semantic versioning.](https://en.wikipedia.org/wiki/Software_versioning)

## Options
`-d`: Run with debug logging.

## Note 
- Compatible with iOS projects using Xcode 11+
