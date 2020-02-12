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

To create an overlay popup where a user can register a new account or log in to a previously created account via password or PIN, do:

```js
// Set up the callback:
edgeUiContext.on('login', edgeAccount => {
    // The user logged in, so save the account somewhere
})

// Open the window:
edgeUiContext.showLoginWindow()
```

![Login UI](http://edge.app/wp-content/uploads/2018/06/Screen-Shot-2018-06-29-at-9.15.13-PM-e1530376379411.png)

Once the user logs in, you receive an `edgeAccount` object. You can also use the account object to manage wallets (each with their own private key). Use code like the following to create a wallet for your application, or load the existing wallet on future logins:

```js
// Find the app wallet, or create one if necessary:
const walletInfo = account.getFirstWalletInfo('wallet:ethereum')
const currencyWallet =
  walletInfo == null
    ? await account.createCurrencyWallet('wallet:ethereum')
    : await account.waitForCurrencyWallet(walletInfo.id)

// Get an address from the wallet:
const addressInfo = await currencyWallet.getReceiveAddress()
const address = addressInfo.publicAddress
```

This `currencyWallet` object has many properties, and can handle sending, receiving, checking balances, and more. Please see the [documentation](https://developer.airbitz.co/javascript/#abccurrencywallet) for more information.

If you need a more low-level API, the keys from the wallet can also sign raw Ethereum transactions:

```js
const walletId = edgeAccount.getFirstWalletInfo('wallet:ethereum').id

const signedTx = await edgeAccount.signEthereumTransaction(
  walletId,
  {
    chainId: 3,
    nonce: '0x00',
    gasPrice: '0x09184e72a000',
    gasLimit: '0x2710',
    to: '0x0000000000000000000000000000000000000000',
    value: '0x00',
    data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
  }
)
```

Please see the [ethereumjs-tx](https://github.com/ethereumjs/ethereumjs-tx/blob/master/docs/index.md) library for information on the Ethereum transaction format.

To open an account management window, pass the account to the `showAccountSettingsWindow` method on the context:

```js
edgeUiContext.showAccountSettingsWindow(edgeAccount)
```

![Management UI](http://edge.app/wp-content/uploads/2018/06/Screen-Shot-2018-06-29-at-11.34.51-PM-e1530376290752.png)

To log a user out, do:

```js
edgeAccount.logout()
```

## Hosting Login IFrame Contents

The Edge Login UI relies on an iframe for most of its functionality. Although we host a copy of these files on our own servers, you may want to host the iframe contents yourself as part of your application. This would be especially useful if you are building a desktop app using Electron or similar technologies where the user's own computer hosts the contents.

You can obtain the iframe contents using the following terminal command, which is available as part of this library:

```sh
cd src && node copy-edge-assets <dest-directory>
```

The `makeEdgeUiContext` function takes an `assetsPath` parameter, which is a URI that points to the iframe contents.

To properly firewall your application code from having access to the Edge account credentials, you need to host the iframe content on a different domain from your main application. For example, if your main application is served from `http://localhost:8080`, you might want to serve the iframe contents from `http://localhost:8081`.

## Demo App

This project contains a demo application in the `src/demo` directory. You can launch this demo using the `yarn start` command. You can also find the [demo](https://developer.airbitz.co/edge-login-ui-web/) on our website.
