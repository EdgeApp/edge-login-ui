# Edge Web Login UI

This library provides a simple, framework-agnostic way to do login and account management with just a small handful of Javascript API calls.

## Basic usage for web

First, install the library from NPM:

```sh
npm install --save edge-login-ui-web
```

Import the library into your project:

```js
import { makeEdgeUiContext } from 'edge-login-ui-web'
// or:
const { makeEdgeUiContext } = require('edge-login-ui-web')
```

To get an API key, download the [Airbitz app](https://airbitz.co/app), create an account, and log in to the [Airbitz developer portal](https://developer.airbitz.co) using the barcode scanner. Note: the new Edge app doesn't have BitID support yet, so the Airbitz app is still required for this step.

Now you can initialize the library:

```js
const edgeUiContext = await makeEdgeUiContext({
  'apiKey': 'api-key-here',
  'appId': 'com.mydomain.myapp',
  'assetsPath': '/path-to-assets/',
  'vendorName': 'My Awesome Project',
  'vendorImageUrl': 'https://mydomain.com/mylogo.png'
});
```

The Edge Login UI relies on an iframe for most of its functionality. You can install the iframe contents using the following terminal command, which is available as part of this library:

```sh
copy-edge-assets <dest-directory>
```

The `assetsPath` parameter to `makeEdgeUiContext` should point to the HTTP location of these files on your web server. If you want to firewall your application code from having access to the Edge account credentials, just host the iframe content on a different domain from your main application.

To create an overlay popup where a user can register a new account or log in to a previously created account via password or PIN, do:

```js
edgeUiContext.openLoginWindow({
  onLogin (edgeUiAccount) {
    // The user logged in, so save the account somewhere
  },
  onClose () {
    // The user has dismissed the login window
  }
})
```

![Login UI](https://airbitz.co/go/wp-content/uploads/2016/08/Screen-Shot-2016-08-26-at-12.50.04-PM.png)

Once the user logs in, you receive an `edgeUiAccount` object. You can use this object to open an account management window for changing the password, PIN, and recovery questions:

```js
edgeUiAccount.openManageWindow({
  onClose() {
    // The user has dismissed the management window
  }
})
```

![Management UI](https://airbitz.co/go/wp-content/uploads/2016/08/Screen-Shot-2016-08-26-at-12.50.26-PM.png)

You can also use the account object to manage wallets (each with their own private key):

```js
async function getAppPrivateKey (edgeUiAccount) {
  // Find the first Ethereum wallet in the account:
  const edgeWalletInfo = edgeUiAccount.getFirstWalletInfo('wallet:ethereum')

  // If an Ethereum wallet already exists, return its key:
  if (edgeWalletInfo != null) {
    return edgeWalletInfo.keys.ethereumKey
  }

  // There are no Ethereum wallets, so make one:
  const keys = {
    ethereumKey: new Buffer(secureRandom(32)).toString('hex')
  }
  const walletId = await edgeUiAccount.createWallet("wallet:ethereum", keys)
  const edgeWalletInfo = edgeUiAccount.walletInfos[walletId]
  return edgeWalletInfo.keys.ethereumKey
}
```

The returned key can then be used as a secure source of entropy for this wallet within your app.

To log a user out, do:

```js
edgeUiAccount.logout()
```

## Demo App

This project contains a demo application in the `src/demo` directory. You can launch this demo using the `yarn start` command. You can also find the [demo](https://developer.airbitz.co/jsuisample) on our website.

If the "Login With Edge" button does not turn blue after 10 seconds, just reload the page and it will work. Building the iframe can take a while the first time the demo loads, so things can time out. This would not be a problem in production where the iframe is already built.

# Detailed Docs

https://developer.airbitz.co/javascript/#airbitz-account-management-ui
