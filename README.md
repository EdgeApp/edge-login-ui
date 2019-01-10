# Edge React Native UI

This repo implements a UI layer on top of [edge-core-js](https://github.com/Airbitz/edge-core-js) to provide web applications the interface required to do all the accounts management in just a small handful of Javascript API calls. All UI operates in an overlay iframe on top of the current HTML view.

## Basic usage for react native mobile application

Add the Edge libraries to your project:

`npm install --save edge-core-js edge-login-ui-rn`

Required: Node ^8.2.1 and NPM ^5.3.0

You will also need to install several native libraries that Edge depends on:

```sh
# Install native support libraries:
npm install --save react-native-fast-crypto react-native-fs
npm install --save git://github.com/Airbitz/react-native-randombytes.git
npm install --save git://github.com/Airbitz/react-native-tcp.git
npm install --save-dev rn-nodeify

# Set up post install
add to package.json scripts object
"postinstall": "sh ./postinstall.sh"

# create post install file
# in root of project create postinstall.sh
# add the following lines

#!/bin/bash
rn-nodeify --hack

# Link support libraries into the native project files:
react-native link react-native-fast-crypto
react-native link react-native-fs
react-native link react-native-randombytes
react-native link react-native-tcp
react-native link edge-login-ui-rn

# delete node modules and re-install
rm -rf node_modules
yarn
```

## iOS build

  Disable BITCODE in your app's build settings

## Android build

You must be running Android Studio 3.0+. Make the following changes to the Android build files in your React Native app:

### `android/app/build.gradle`

  * `compileSdkVersion 27` or higher
  * `minSdkVersion 23` or higher
  * `targetSdkVersion 25` or higher
  * `buildToolsVersion "25.0.3"` or higher

Add the following:

```
android {
      ...
      compileOptions {
          sourceCompatibility JavaVersion.VERSION_1_8
          targetCompatibility JavaVersion.VERSION_1_8
      }
      defaultConfig {
          ...
          multiDexEnabled true
      }
}

dependencies {
      ...
      compile 'com.android.support:appcompat-v7:27.0.1'
}
```

### `android/build.gradle`

```
repositories {
      ...
      google()
}

dependencies {
      ...
      classpath 'com.android.tools.build:gradle:3.0.1'
}
```

### `android/gradle-wrapper.properties`

```
classpath 'com.android.tools.build:gradle:3.0.0'
distributionUrl=https://services.gradle.org/distributions/gradle-4.1-all.zip
android.enableAapt2=false
android.threadPoolSize=4
android.useDeprecatedNdk=true
```

## Using the login component your project

Get an API key from

https://developer.airbitz.co

You'll need an account on the Airbitz Mobile App which you can download for iOS and Android at

  [iOS App Store](https://itunes.apple.com/us/app/airbitz-bitcoin-wallet/id843536046)
  
  [Google Play Store](https://play.google.com/store/apps/details?id=com.airbitz)

On the `developer.airbitz.co` page, scan the QR code using the Airbitz Mobile App after signing in and register an email address.

To use the component in your app you will need to two airbitz core libraries

```javascript
import { LoginScreen } from ‘edge-login-ui-rn’
import { makeEdgeContext } from ‘edge-core-js’
```

Outside of the component class, in the file that you want to add the login you will need to set up a function to validate your app with Edge.

```javascript
function setupCore () {
  return makeEdgeContext({
    // Replace this with your own API key from https://developer.airbitz.co:
    apiKey: ‘<your api key >’,
    appId: 'com.mydomain.myapp',
    vendorName: ‘<Your vendor name >’,
    vendorImageUrl: 'https://airbitz.co/go/wp-content/uploads/2016/10/GenericEdgeLoginIcon.png'
  })
}
```

In your component that will utilize the login component add the following code to the constructor method:

```javascript
this.state = { context: null, account: null }
// Creating the context is async, so we store it in our state:
setupCore().then(context => this.setState(state => ({ ...state, context })))
```

Set up your render function:

```javascript
render () {
  const onLogin = account => this.setState(state => ({ ...state, account }))

  // Once the context is ready, we can show the login screen:
  return (
    <View style={styles.container}>
      {this.state.context
        ? <LoginScreen context={this.state.context} onLogin={onLogin} />
        : <Text style={styles.welcome}>Loading</Text>}
    </View>
  )
}
```

In order to customize the experience and integrate with your app, change the `onLogin` function to handle getting back the account information.


Use the `account` object to create and restore wallet private keys

```js
async function getAppPrivateKey (account) {
  // Find the first Ethereum wallet in the account:
  const edgeWalletInfo = account.getFirstWalletInfo('wallet:ethereum')

  // If an Ethereum wallet already exists, return its key:
  if (edgeWalletInfo != null) {
    return edgeWalletInfo.keys.ethereumKey
  }

  // There are no Ethereum wallets, so make one:
  const keys = {
    ethereumKey: new Buffer(secureRandom(32)).toString('hex')
  }
  const walletId = await account.createWallet("wallet:ethereum", keys)
  const edgeWalletInfo = account.walletInfos[walletId]
  return edgeWalletInfo.keys.ethereumKey
}
```

## Sample ReactNative App repo

See a sample implementation at [edge-login-ui-rn-demo](https://github.com/EdgeApp/edge-login-ui-rn-demo)
