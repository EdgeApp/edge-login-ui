# airbitz-core-js-ui

## 1.0.0-alpha.0

* rn: Update packages to work with RN 0.56
* web: n/a

## 0.3.3

* rn: Various font & style fixes.
* web: Fix currency wallet creation.

## 0.3.2

* react: Fix a spelling mistake.
* rn: Fix endless spinning on incorrect OTP login (again).
* web: Implement `createCurrencyWallet`.
* web: Fix Ethereum transaction signing.

## 0.3.1

* rn: Fix endless spinning on incorrect OTP login.

## 0.3.0

* web: Add transaction signing & private-key lockdown mode.
* web: Host iframe contents on the web for easier setup.
* react: Many UI fixes

## 0.2.13

* rn: Expose & fix some sneaky flow errors.

## 0.2.12

* all: Stop using deprecated core API's.
* rn: Add Confirmation Screen for Password Recovery.

## 0.2.11

* web: Fix recovery email contents to refer to "Edge".
* web: Do not show the account settings when they aren't available.
* web: Increase iframe timeouts.
* all: Upgrade edge-core-js to fix errors with really long passwords.

## 0.2.10

* react: Add missing files to the NPM module.
* web: Improve the account-creation screen.
* web: Fix screen height issues.

## 0.2.9

* all: Upgrade edge-login-js.
* web: Update the demo.
* web: Do not wipe out the context user list on login.

## 0.2.8

* web: Re-publish without using buggy Lerna.

## 0.2.7

* web: Re-publish due to Lerna bug.

## 0.2.6

* all: Fix build scripts to work correctly on Windows.
* rn: Fix corrupted header on 2fa screen.
* web: Fix various typos and visual glitches.
* web: Add a user list to the `EdgeUiContext` object.
* web: Rename `EdgeUiAccount.getFirstWallet` to `getFirstWalletInfo`.

## 0.2.5

* web: Re-publish library due to packaging error.

## 0.2.4

* web: Hack the library not to crash in node.js environments.
* react: Upgrade vulnerable moment.js.

## 0.2.3

* Publish `edge-login-ui-web`.
* web: Fix the `copy-edge-assets` script.

## 0.2.2

* Publish `edge-login-ui-react`.
* Fix minor visual glitches on the React Native login screens.
* Begin preparing React Native login screens for localization.

## 0.2.1

* Fix react-native build issues
* Fix the Samsung Note 8 crash

## 0.2.0

* Split the project into two NPM packages

## 0.1.6

* Upgrade to airbitz-core-js v0.3.5, which fixes edge logins.

## 0.1.5

* Upgrade to airbitz-core-js v0.3.4.
* Simplified the `assets` folder path specification.

## 0.1.4

* Upgrade to airbitz-core-js v0.3.3
