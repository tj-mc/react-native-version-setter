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

## 🚀 Usage
Simply call `npx react-native-version-setter [version]` in your project root.

```
$: npm run setVersion 1.2.0
[RNVS] MyApp: 1.0.0: ==> 1.2.0 ✅ 

$: npm run setVersion 1.2.0
[RNVS] Version is already 1.2.0 🛑
```

## 👩‍💻 Freeform Versioning
In most cases it makes sense to use conventional [semantic versioning.](https://semver.org/spec/v2.0.0.html)

From version 2, RNVS has full support for extended semVer syntax, like `1.2.3-alpha`. These symbols are not supported on iOS, 
so they are stripped out automatically. They will be inserted as normal into android files and `package.json`. 

## ⛳ Flags 
`-d`: Runs with debug logging.

`-r`: Prepares version strings, but logs to console instead of writing to file. 

`-android`: Set version for android only

`-ios`: Set version for iOS only

## ⚙️ Config
In most cases you won't need any config at all, but creating a `.rnvs.json` file in your project root will expose some extra options. Below are all accepted properties with example values.
```
{
  // RNVS uses the project name 
  // in package.json by default,
  // But your ios project name might differ.
  "iosProjectName": "MyApp"
}
```


## 💻 Compatibility
- Compatible with iOS projects using Xcode 11+

## 🗺️ Roadmap
- getVersion command
- setVersion per-platform ✅ v2.1.0

## 👋 Troubleshooting
#### Version setting not working on new project
Ensure you have opened the generated `.xcodeproj` file at least once. On the first opening, Xcode will create the
`MARKETING_VERSION` field that holds your app version. Prioed to this, there is nowhere to store the iOS version.

#### Need Help?
If you're after a new feature that isn't listed on the roadmap, or you're having trouble with this package, please open an issue.
