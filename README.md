# react-native-version-setter
![](./rnvs.png)

![licence](https://img.shields.io/npm/l/react-native-version-setter?style=flat-square)
![NPM Version](https://img.shields.io/npm/v/react-native-version-setter?style=flat-square)
![download](https://img.shields.io/npm/dt/react-native-version-setter?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-gree?&style=flat-square)

The simplest way to update your app version.

Will auto update the following files:
```
android/app/build.gradle versionName
android/app/build.gradle versionCode
ios/{projectName}.xcodeproj/project.pbxproj MARKETING_VERSION
package.json "version"
```

##🌐 Install
npm: ```npm i react-native-version-setter```

yarn: ```yarn add react-native-version-setter```

##🚀 Usage
Simply call `npm run setVersion` or `yarn run setVersion` in your project root.

```
$: npm run setVersion 1.2.0
[RNVS] MyApp: 1.0.0: ==> 1.2.0 ✅ 

$: npm run setVersion 1.2.0
[RNVS] Version is already 1.2.0 🛑
```

##👩‍💻 Freeform Versioning
RNVS does not impose restrictions on versioning style. 
Feel free set your version numbers in whatever format works for you. For example, Date-based versioning:
```
$: npm run setVersion 1.20200909.1
[RNVS] MyApp: 1.0.0: ==> 1.20200909.1 ✅ 
```

In most cases it makes sense to use conventional [semantic versioning.](https://semver.org/spec/v2.0.0.html)

From version 2, RNVS has full support for extended semVer syntax, like `1.2.3-alpha`. These symbols are not supported on iOS, 
so they are stripped out automatically. They will be inserted normal into android files and `package.json`. 

##⛳ Flags 
`-d`: Runs with debug logging.

`-r`: Prepares version strings, but logs to console instead of writing to file. 

##💻 Compatibility
- Compatible with iOS projects using Xcode 11+

##🗺️ Roadmap
- getVersion command
- setVersion per-platform 

##👋 Troubleshooting
#### Version setting not working on new project
Ensure you have opened the generated `.xcodeproj` file at least once. On the first opening, Xcode will create the
`MARKETING_VERSION` field that holds your app version. Prioed to this, there is nowhere to store the iOS version.

