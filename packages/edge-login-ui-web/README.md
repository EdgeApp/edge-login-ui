# Airbitz Javascript UI

This repo implements a UI layer on top of [edge-login](https://github.com/Airbitz/edge-login) to provide web applications the interface required to do all the accounts management in just a small handful of Javascript API calls. All UI operates in an overlay iframe on top of the current HTML view.

## Build from source repo (not needed if using NPM)

`npm install` to fetch the dependencies.
`npm run build` to create the web bundle.

## Or just use the NPM package from your own repo

`npm install airbitz-core-js-ui --save`

## Basic usage for web

Get an API key from

https://developer.airbitz.co

You'll need an account on the Airbitz Mobile App which you can download for iOS and Android at

https://airbitz.co/app

On the `developer.airbitz.co` page, scan the QR code using the Airbitz Mobile App after signing in and register an email address.

Install from npm

    npm install airbitz-core-js-ui --save

Include the `abcui.js` file in your code (using Webpack or any other bundler of your choice):

    var abcui = require('airbitz-core-js-ui')

Now start diving in and make some calls

Initialize the library

    _abcUi = abcui.makeABCUIContext({'apiKey': 'api-key-here',
                                     'appId': 'com.mydomain.myapp',
                                     'assetsPath': '/path-to-assets/',
                                     'vendorName': 'My Awesome Project',
                                     'vendorImageUrl': 'https://mydomain.com/mylogo.png'});

where `/path-to-assets/` tells the UI where to find the contents of the `assets` directory of this node module via HTTP. When updating this node module, you must keep the `assets` directory up-to-date on your server. We suggest automating this using NPM scripts or any other tool or your choice.

Create an overlay popup where a user can register a new account or login to a previously created account via password or PIN.

    _abcUi.openLoginWindow(function(error, account) {
      _account = account;
    });

![Login UI](https://airbitz.co/go/wp-content/uploads/2016/08/Screen-Shot-2016-08-26-at-12.50.04-PM.png)

Launch an account management window for changing password, PIN, and recovery questions

    _abcUi.openManageWindow(_account, function(error) {

    });

![Manage UI](https://airbitz.co/go/wp-content/uploads/2016/08/Screen-Shot-2016-08-26-at-12.50.26-PM.png)

Get or create a wallet inside of the account

    _abcUi.openLoginWindow(function(error, account) {
      _account = account;

      // Get the first wallet in the account that matches our required wallet type
      const abcWallet = account.getFirstWallet('wallet:repo:ethereum');
      if (abcWallet == null) {
        // Create an ethereum wallet if one doesn't exist:
        const keys = {
          ethereumKey: new Buffer(secureRandom(32)).toString('hex')
        }
        account.createWallet("wallet:repo:ethereum", keys, function (err, id) {
          if (err) {
            // Yikes. This shouldn't fail except for network or disk errors
          } else {
            _wallet = account.getWallet(id)
            _key = _wallet.keys.ethereumKey
            // Update your UI here
          }
        })
      } else {
        _wallet = abcWallet
        _key = _wallet.keys.ethereumKey
        // Update your UI here
      }
    }

`_key` can then be used as a secure source of entropy for this wallet within your app


Logoff a user

    _account.logout();

## Sample website repo

See a sample implementation at [airbitz-core-js-sample](https://github.com/Airbitz/airbitz-core-js-sample)

# Detailed Docs

https://developer.airbitz.co/javascript/#airbitz-account-management-ui
