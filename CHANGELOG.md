# airbitz-core-js-ui

## 0.5.5

* web: Fix the demo.
* rn: Fix styling.

## 0.5.4

* rn: clean up of translatable strings.
* rn: clean up of scaling issues

## 0.5.3

* web: Fix a build issue.

## 0.5.2

* rn: Fix more scaling issues.
* web: Upgrade to edge-core-js v0.12.3 (may affect callback timing).
* web: Fix build issues.
* web: Update readme file.

## 0.5.1

* rn: Fix scaling issues.
* rn: Fix React key property error.
* rn: Disable TouchId during login.
* rn: Upgrade the Whorlwind library.
* rn: Add hacked `androidFetch` function to work around Bitpay issue.

## 0.5.0

* web: Re-write the iframe to use the `yaob` bridge added in edge-core-js v0.11.0. This gives the web access to the full core API, including spending.

## 0.4.8

* upgrade to edge-core-js v0.11.1

## 0.4.7

* rn: Use forked react-native-size-matters to fix iPad horizontal

## 0.4.6

* rn: fix f digit pin connector to prevent crash

## 0.4.5

* rn: surfaced rate limits on accountlogin
* rn: add alert for any account on the device that is experiencing a 2fa reset
* rn: fixed removing of usernames from device

## 0.4.3

* rn: upgrade dependencies for rn56 compatibility
* rn: implement AccountOptions
* rn: upgrade core
* rn: created account module scaling

## 0.4.2

* rn: rollback dependencies for rn56 compatibility
* rn: remove auto-translated files from being active

## 0.4.1

* rn: upgrade dependencies for rn56 compatibility

## 0.4.0

* rn: modified text for password recovery.
* rn: changes based on removal of context.io in core

## 0.3.5

* rn: added localization auto detect.
* rn: Machnie translations for Spanish, Portuguese.
* rn: Fix autocorrect bug on username creation
* rn: add firebase
* rn: fix types for imports
* rn: modified text for clarity

## 0.3.4

* rn: added git tag in failed publish attempt

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
