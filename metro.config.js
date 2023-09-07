{
    "root": "C:\\Users\\elian\\source\\repos\\BetterStudent",
    "reactNativePath": "C:\\Users\\elian\\source\\repos\\BetterStudent\\node_modules\\react-native",
    "reactNativeVersion": "0.72",
    "dependencies": {
      "expo": {
        "root": "C:\\Users\\elian\\source\\repos\\BetterStudent\\node_modules\\expo",
        "name": "expo",
        "platforms": {
          "ios": {
            "podspecPath": "C:\\Users\\elian\\source\\repos\\BetterStudent\\node_modules\\expo\\Expo.podspec",
            "configurations": [],
            "scriptPhases": []
          },
          "android": {
            "sourceDir": "C:\\Users\\elian\\source\\repos\\BetterStudent\\node_modules\\expo\\android",
            "packageImportPath": "import expo.modules.ExpoModulesPackage;",
            "packageInstance": "new ExpoModulesPackage()",
            "buildTypes": [],
            "componentDescriptors": [],
            "cmakeListsPath": "C:/Users/elian/source/repos/BetterStudent/node_modules/expo/android/build/generated/source/codegen/jni/CMakeLists.txt"
          }
        }
      }
    },
    "commands": [
      {
        "name": "log-ios",
        "description": "starts iOS device syslog tail",
        "options": [
          {
            "name": "--interactive",
            "description": "Explicitly select simulator to tail logs from. By default it will tail logs from the first booted and 
  available simulator."
          }
        ]
      },
      {
        "name": "run-ios",
        "description": "builds your app and starts it on iOS simulator",
        "examples": [
          {
            "desc": "Run on a different simulator, e.g. iPhone SE (2nd generation)",
            "cmd": "react-native run-ios --simulator \"iPhone SE (2nd generation)\""
          },
          {
            "desc": "Run on a connected device, e.g. Max's iPhone",
            "cmd": "react-native run-ios --device \"Max's iPhone\""
          },
          {
            "desc": "Run on the AppleTV simulator",
            "cmd": "react-native run-ios --simulator \"Apple TV\"  --scheme \"helloworld-tvOS\""
          }
        ],
        "options": [
          {
            "name": "--simulator <string>",
            "description": "Explicitly set simulator to use. Optionally include iOS version between parenthesis at the end to match an exact version: \"iPhone 6 (10.0)\""
          },
          {
            "name": "--mode <string>",
            "description": "Explicitly set the scheme configuration to use. This option is case sensitive."
          },
          {
            "name": "--configuration <string>",
            "description": "[Deprecated] Explicitly set the scheme configuration to use"
          },
          {
            "name": "--scheme <string>",
            "description": "Explicitly set Xcode scheme to use"
          },
          {
            "name": "--device [string]",
            "description": "Explicitly set device to use by name.  The value is not required if you have a single device connected."
          },
          {
            "name": "--destination <string>",
            "description": "Explicitly extend distination e.g. \"arch=x86_64\""
          },
          {
            "name": "--udid <string>",
            "description": "Explicitly set device to use by udid"
          },
          {
            "name": "--verbose",
            "description": "Do not use xcbeautify or xcpretty even if installed"
          },
          {
            "name": "--port <number>",
            "default": 8081
          },
          {
            "name": "--terminal <string>",
            "description": "Launches the Metro Bundler in a new window using the specified terminal path."
          },
          {
            "name": "--xcconfig [string]",
            "description": "Explicitly set xcconfig to use"
          },
          {
            "name": "--buildFolder <string>",
            "description": "Location for iOS build artifacts. Corresponds to Xcode's \"-derivedDataPath\"."
          },
          {
            "name": "--extra-params <string>",
            "description": "Custom params that will be passed to xcodebuild command."
          },
          {
            "name": "--no-packager",
            "description": "Do not launch packager while building"
          },
          {
            "name": "--binary-path <string>",
            "description": "Path relative to project root where pre-built .app binary lives."
          },
          {
            "name": "--list-devices",
            "description": "List all available iOS devices and simulators and let you choose one to run the app. "
          },
          {
            "name": "--interactive",
            "description": "Explicitly select which scheme and configuration to use before running a build and select device to run the application."
          }
        ]
      },
      {
        "name": "build-ios",
        "description": "builds your app on iOS simulator",
        "examples": [
          {
            "desc": "Build the app for the IOS simulator",
            "cmd": "react-native build-ios"
          },
          {
            "desc": "Build the app for all IOS devices",
            "cmd": "react-native build-ios --mode \"Release\""
          },
          {
            "desc": "Build the app for a specific IOS device",
            "cmd": "react-native build-ios --simulator \"IPhone 11\""
          }
        ],
        "options": [
          {
            "name": "--simulator <string>",
            "description": "Explicitly set simulator to use. Optionally include iOS version between parenthesis at the end to match an exact version: \"iPhone 6 (10.0)\""
          },
          {
            "name": "--mode <string>",
            "description": "Explicitly set the scheme configuration to use. This option is case sensitive."
          },
          {
            "name": "--configuration <string>",
            "description": "[Deprecated] Explicitly set the scheme configuration to use"
          },
          {
            "name": "--scheme <string>",
            "description": "Explicitly set Xcode scheme to use"
          },
          {
            "name": "--device [string]",
            "description": "Explicitly set device to use by name.  The value is not required if you have a single device connected."
          },
          {
            "name": "--destination <string>",
            "description": "Explicitly extend distination e.g. \"arch=x86_64\""
          },
          {
            "name": "--udid <string>",
            "description": "Explicitly set device to use by udid"
          },
          {
            "name": "--verbose",
            "description": "Do not use xcbeautify or xcpretty even if installed"
          },
          {
            "name": "--port <number>",
            "default": 8081
          },
          {
            "name": "--terminal <string>",
            "description": "Launches the Metro Bundler in a new window using the specified terminal path."
          },
          {
            "name": "--xcconfig [string]",
            "description": "Explicitly set xcconfig to use"
          },
          {
            "name": "--buildFolder <string>",
            "description": "Location for iOS build artifacts. Corresponds to Xcode's \"-derivedDataPath\"."
          },
          {
            "name": "--extra-params <string>",
            "description": "Custom params that will be passed to xcodebuild command."
          },
          {
            "name": "--interactive",
            "description": "Explicitly select which scheme and configuration to use before running a build"
          }
        ]
      },
      {
        "name": "log-android",
        "description": "starts logkitty"
      },
      {
        "name": "run-android",
        "description": "builds your app and starts it on a connected Android emulator or device",
        "options": [
          {
            "name": "--mode <string>",
            "description": "Specify your app's build variant"
          },
          {
            "name": "--variant <string>",
            "description": "Specify your app's build variant. Deprecated! Use 'mode' instead"
          },
          {
            "name": "--no-packager",
            "description": "Do not launch packager while building"
          },
          {
            "name": "--port <number>",
            "default": 8081
          },
          {
            "name": "--terminal <string>",
            "description": "Launches the Metro Bundler in a new window using the specified terminal path."
          },
          {
            "name": "--tasks <list>",
            "description": "Run custom Gradle tasks. By default it's \"assembleDebug\". Will override passed mode and variant arguments."
          },
          {
            "name": "--active-arch-only",
            "description": "Build native libraries only for the current device architecture for debug builds.",
            "default": false
          },
          {
            "name": "--extra-params <string>",
            "description": "Custom params passed to gradle build command"
          },
          {
            "name": "--interactive",
            "description": "Explicitly select build type and flavour to use before running a build"
          },
          {
            "name": "--appId <string>",
            "description": "Specify an applicationId to launch after build. If not specified, `package` from AndroidManifest.xml will be used.",
            "default": ""
          },
          {
            "name": "--appIdSuffix <string>",
            "description": "Specify an applicationIdSuffix to launch after build.",
            "default": ""
          },
          {
            "name": "--main-activity <string>",
            "description": "Name of the activity to start",
            "default": "MainActivity"
          },
          {
            "name": "--deviceId <string>",
            "description": "builds your app and starts it on a specific device/simulator with the given device id (listed by running \"adb devices\" on the command line)."
          },
          {
            "name": "--list-devices",
            "description": "Lists all available Android devices and simulators and let you choose one to run the app",
            "default": false
          },
          {
            "name": "--binary-path <string>",
            "description": "Path relative to project root where pre-built .apk binary lives."
          },
          {
            "name": "--user <number>",
            "description": "Id of the User Profile you want to install the app on."
          }
        ]
      },
      {
        "name": "build-android",
        "description": "builds your app",
        "options": [
          {
            "name": "--mode <string>",
            "description": "Specify your app's build variant"
          },
          {
            "name": "--variant <string>",
            "description": "Specify your app's build variant. Deprecated! Use 'mode' instead"
          },
          {
            "name": "--no-packager",
            "description": "Do not launch packager while building"
          },
          {
            "name": "--port <number>",
            "default": 8081
          },
          {
            "name": "--terminal <string>",
            "description": "Launches the Metro Bundler in a new window using the specified terminal path."
          },
          {
            "name": "--tasks <list>",
            "description": "Run custom Gradle tasks. By default it's \"assembleDebug\". Will override passed mode and variant arguments."
          },
          {
            "name": "--active-arch-only",
            "description": "Build native libraries only for the current device architecture for debug builds.",
            "default": false
          },
          {
            "name": "--extra-params <string>",
            "description": "Custom params passed to gradle build command"
          },
          {
            "name": "--interactive",
            "description": "Explicitly select build type and flavour to use before running a build"
          }
        ]
      }
    ],
    "healthChecks": [],
    "platforms": {
      "ios": {},
      "android": {}
    },
    "project": {
      "ios": null,
      "android": null
    }
  }