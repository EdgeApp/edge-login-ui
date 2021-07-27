# edge-login-ui

## 0.9.13 (2021-07-27)

- rn: Close modals on scene exit.
- rn: Add type definitions for TypeScript (this release re-writes the entire codebase into TypeScript, but this should be the only externally-visible difference).

## 0.9.12 (2021-07-20)

- rn: Added back a couple of "$FlowFixMe" that is needed when this module is used by edge-react-gui

## 0.9.11 (2021-07-20)

- rn: Synchronize outlined text field logic fixes
- rn: Tighten the outlined text field props
- rn: Fix the crash in the QR-login modal
- rn: Run `yarn precommit` to update strings
- rn: Always close modals on the way out the door
- rn: Fix coding errors caught by TypeScript
- rn: Add missing react-native-gesture-handler dependency
- rn: Put `withTheme` after `connect`
- rn: Simplify the `Fade` component
- rn: Move the `isASCII` function to the right file
- rn: Use better export syntax
- rn: Use modern syntax for localization
- rn: Remove unused components & libraries
- rn: Implemented recovery translations
- rn: Add back button to the "TermsAndConditions" screen
- rn: Switch New Account flow screens positions: move "TermsAndConditions" screen after "Pin" screen and before "Wait" screen
- rn: Upgrade to react-native-airship v0.2.6

## 0.9.10 (2021-07-14)

- rn: Put working auto scroll on the account creation screens
- rn: Fix Next button size and spacing
- rn: Fix terms confirm button location
- rn: Fix text input box padding
- rn: Fix font size on terms and conditions screen
- rn: Fix account info border widths
- rn: Update welcome screen text
- rn: Update PIN description text
- rn: Change back button icon
- rn: Fix inconsistent horizontal margins in New Account flow screens
- rn: Add the ability to set all sides margins in Divider component
- rn: Add "overflow: 'hidden'" to the styles of KeyboardAvoidingView and inner container
- rn: Fix spinner bugs in sign up buttons
- rn: Restore themed buttons to sanity
- rn: Add eslint-plugin-react-native to the project
- rn: Fix ability of Fade component to hide children after animation
- rn: Add Back button to New Account screens
- rn: Create themed Back button component
- rn: Change small outlined field padding and font size
- rn: Change containers paddings/margins in all New Account flow screens to match the current design11:59
- rn: Add additional margin for title SimpleSceneHeader component to prevent visual glitches
- rn: Change Divider component marginVertical prop default value
- rn: Upgrade to react-native-patina v0.1.4

## 0.9.9 (2021-07-05)

- rn: New themed Create Account flow
- rn: Update translations

## 0.9.8 (2021-06-21)

- rn: Fix Change Recovery Questions modal on large screens
- rn: Update translations

## 0.9.7 (2021-06-14)

- rn: Add Exit button to return to the landing screen from registration flow

## 0.9.6 (2021-06-11)

- rn: Close the security alerts if the list starts empty

## 0.9.5 (2021-06-08)

- rn: New themed Create Account scene
- rn: Reorganize layers and decreased tappable area to prevent text entry in PIN field
- rn: Allow direct entry of recovery token
- rn: Update translations

## 0.9.4 (2021-05-26)

- rn: Prevent user from selecting duplicate recovery questions

## 0.9.3 (2021-05-25)

- rn: Show error on Change Password Recovery Screen when user selecting the same question
- rn: Fix spacing issue on create account welcome screen
- rn: Prepare for future edge-core-js breaking changes

## 0.9.2 (2021-05-10)

- rn: Add testID's to various screens.
- rn: Improve internal type-safety. This should not have any extenally-visible effects.

## 0.9.1 (2021-04-19)

- rn: Disable the password recovery email on Android. This works around a tricky crash in the React Native rendering code.

## 0.9.0 (2021-04-12)

- rn: Update modal colors

## 0.8.3 (2021-04-07)

- *Breaking change: This release contains a breaking change that was not indicated in the minor version update*:
  - rn: Prompt for notification permissions to support security features
- rn: Restrict PIN input to numbers only
- rn: Show error when recovery questions match

## 0.8.2 (2021-04-06)

- rn: Port all password recovery modals to the new theming system.
- rn: Fix a bug that would leave the recovery token blank when sharing recovery links.

## 0.8.1 (2021-03-25)

- rn: Show a spinner on the barcode modal.

## 0.8.0 (2021-03-12)

- Breaking changes:
  - rn: Add react-native-share as a native dependency.
- Other changes:
  - Add a "share" option for the password recovery token.

## 0.7.1 (2021-03-03)

- rn: Catch & display errors while launching screens.
- rn: Make the OTP error & OTP repair screens less confusing based on user feedback.
- rn: Upgrade edge-core-js & use its latest type definitions internally.
- all: Upgrade linting tools.

## 0.7.0 (2021-02-24)

- Breaking changes:
  - rn: Add a native react-native-localize dependency.
  - rn: Remove the unused `folder` parameter from various touch-related functions:
    - `isTouchEnabled`
    - `isTouchDisabled`
    - `enableTouchId`
    - `disableTouchId`
  - rn: Remove the `error` parameter from the `onLogin` callback.
  - rn: Remove the `ChooseTestAppScreen` component.
  - rn: Upgrade other native dependencies.
- Other changes:
  - rn: Add German translation.
  - rn: Flip the background gradient direction.
  - rn: Improve thex security alerts screen appearance

## 0.6.29 (2021-02-19)

- rn: Add a new 2fa repair screen component.

## 0.6.28 (2021-01-26)

- rn: Only fetch recovery questions if they exist

## 0.6.27 (2021-01-22)

- rn: Fix the OTP backup code modal crash.
- rn: Add a scroll view to the change password screen.
- rn: Expose the security alerts screen as a standalone component.
  - Add `hasSecurityAlerts` and `watchSecurityAlerts` helpers to determine when to show this screen.
  - Add a `skipSecurityAlerts` prop to the `LoginScreen` component, so the GUI can manage the alerts instead of the login UI.
- rn: Eliminate all legacy Disklet usage.

## 0.6.26 (2021-01-11)

- rn: Expose the QR modal from the password login screen
- rn: Update translations

## 0.6.25 (2021-01-08)

- rn: Fix a bug that could show the user redundant login approval requests.
- rn: Add helper text to pin login network errors.
- rn: Improve the password recovery error text.
- rn: Replace several old-style modals with themed modals.

## 0.6.24 (2020-12-18)

- rn: Fix & theme the password recovery input modal.
- rn: Show the correct header for IP validation errors.
- rn: Fix typos on the 2fa reset modal.

## 0.6.23 (2020-12-09)

- rn: Add colors to all spinner components.
- rn: Fix Flow types around react-native-material-textfield.

## 0.6.22 (2020-11-20)

- rn: Use a different icon for the back button.

## 0.6.21 (2020-11-02)

- rn: Add a skip button to the security alert screen.
- rn: Fix layout issues on iPhone 12 devices.
- rn: Clean various icon-related components.

## 0.6.20 (2020-10-15)

- rn: Don't show the reset button without a reset token.
- rn: Use more modern React methods & import styles.

## 0.6.19 (2020-10-08)

- rn: Upgrade to react-redux v6.0.1.
- rn: Theme the delete user modal.

## 0.6.18 (2020-09-22)

- rn: Fix a crash when rendering the SecondaryButton. This would occur when the 2fa reminder modal popped up.

## 0.6.17 (2020-09-18)

- rn: Fix a race condition that could lead to an infinite login loop.

## 0.6.16 (2020-09-14)

- rn: Upgrade to the latest react-native-airship.
- rn: Remove unused TouchId logic from the password login screen.
- rn: Re-theme and add voucher support to the OTP reset alert, OTP error screen, and related modals.
- rn: Route to a security alert screen after logging into an account with pending issues.

## 0.6.15 (2020-09-03)

- rn: Do not enable touch for users without locally-stored data.
- rn: Fix the modal title size.
- rn: Upgrade to react-native-patina v0.1.3

## 0.6.14 (2020-08-17)

- rn: Use react-native-airship to power more modals.
- rn: Fix the header "skip" buttons on the password recovery workflow.
- rn: Many internal cleanups & refactorings.

## 0.6.13 (2020-08-10)

- rn: Prevent the welcome screen from flickering at startup, due to a bug in the last release.

## 0.6.12 (2020-08-04)

- web: Add a temporary `etherscanApiKey` field to `makeEdgeUiContext`,
- rn: Enforce Flow typing & other cleanups throughout the codebase. This shouldn't have any user-visible changes.

## 0.6.11 (2020-06-05)

- Fix ion icon size variable name

## 0.6.10

- rn: Remove native-base as a dependency.
- rn: Upgrade to react-native-vector-icons version 6.

## 0.6.9

- rn: Make the password recovery scene question list full height.
- rn: Fix the OTP scene buttons.

## 0.6.8 (2020-03-18)

- rn: Add auto scroll to terms and condition screen

## 0.6.7 (2020-03-09)

- rn: Update translations

## 0.6.6 (2020-02-11)

- rn: Fix previous users related crashes

## 0.6.5 (2020-02-09)

- rn: Added most recently used function to username list

## 0.6.4 (2020-02-04)

- rn: Update TOS

## 0.6.2 (2019-11-25)

- web: Improve visual appearance.
- rn: Fix compatibility with React Native 0.61

## 0.6.1 (2019-11-13)

- rn: Export `getSupportedBiometryType`

## 0.6.0 (2019-10-25)

- web: Visually redesign the SDK.
- rn: Allow the user to trigger an action by tapping the logo 5x.

## 0.5.44 (2019-10-08)

- rn: Fix layout on change PIN & change password screens.
- rn: Handle password recovery + 2FA.
- rn: Fix UX on 2FA entry screen.

## 0.5.43 (2019-09-27)

- Fix cropping of logo on new account welcome scene
- Upgrade flow and fix new flow errors
- Upgrade vulnerable dev dependency

## 0.5.41 (2019-09-13)

- rn: Fix fingerprint crash at login.

## 0.5.40 (2019-09-12)

- rn: Fix visual glitches.

## 0.5.39 (2019-09-09)

- web: Upgrade build tooling.
- rn: Update transactions.
- rn: Make "Confirm Password" string translatable.
- rn: Remove dangling semicolon.

## 0.5.38 (2019-08-07)

- rn: Update transactions.

## 0.5.37 (2019-08-06)

- rn: Fix button widths on tablets,
- rn: Fix Touch ID wording.
- rn: Update translations.

## 0.5.36 (2019-07-25)

- rn: Fix icons & messages for the updated login flow.

## 0.5.35 (2019-07-24)

- rn: Fix bugs with the refactored login flow.

## 0.5.34 (2019-07-22)

- rn: Refactor login flow to separate PIN / fingerprint / face methods.

## 0.5.31 (2019-06-10)

- rn: Fix modals to cover the entire screen.

## 0.5.21 (2019-05-13)

- rn: Show the exact date of the upcoming 2fa reset.

## 0.5.20 (2019-05-07)

- rn: Provide props for easy customization of text and logos
- rn: Improve visual appearance of some items

## 0.5.19 (2019-04-22)

- rn: Fix compatibility with React Native v0.59

## 0.5.18 (2019-04-01)

- rn: Fix account creation error popup.
- web: Fix Edge login barcode not working.

## 0.5.17

- rn: fix mobile safari
- rn: fix edge login password recovery bug
- rn: login text and functionality changes
- rn: fix pin login not displaying correctly on mobile
- rn: fix bug on delete cached mobile modal
- rn: fix some locale variables
- rn: change url links to latest url app
- rn: track if TextInput is mounted before calling focus()

## 0.5.16

- rn: update strings

## 0.5.15

- rn: added ko, fr, and vi language translations
- rn: improved UX for Login Screen with multiple accounts

## 0.5.14

- rn: handle errors thrown during create account

## 0.5.13

- all: Upgrade to edge-core-js v0.13.5
- rn: Fix fullscreen modal positioning

## 0.5.12

- rn: added Japanese
- rn: updated some translations

## 0.5.11

- rn: new background images
- rn: pin login close drop down bug
- rn: fix OTP error on character length

## 0.5.10

- rn: Wrap 2FA scene in SafeAreaView to account for notch on iPhone X
- rn: update components to remove componentWillMount
- rn: Adjust header styles
- rn: fix error message to only show wait when needed
- rn: Upgrade eslint
- rn: Change Airbitz texts to Edge, change -Edge vs Airbitz- to -Scan or Ta…
- rn: remove deprecated apis

## 0.5.9

- rn: Adjust height of PIN field on create account slightly
- rn: Fix styling for passwordRecoveryModal to prevent keyboard covering
- rn: Adjust font size of the CANCEL button on the Password Recovery screen

## 0.5.8

- Re-added Password Recovery Questions modal email input

## 0.5.7

- Added language translations for Spanish, Italian, Russian, and Portuguese
- Fixes for UI scaling and spacing

## 0.5.6

- CreateAccountNextButton UI tweak
- PasswordChange UI tweak
- PasswordRecovery scaling
- Fixes to new account PIN scene
- Prevent spinner from showing when user taps "Next" without typing a username in Create Account flow
- Add padding under Confirm Password field

## 0.5.5

- web: Fix the demo.
- rn: Fix styling.

## 0.5.4

- rn: clean up of translatable strings.
- rn: clean up of scaling issues

## 0.5.3

- web: Fix a build issue.

## 0.5.2

- rn: Fix more scaling issues.
- web: Upgrade to edge-core-js v0.12.3 (may affect callback timing).
- web: Fix build issues.
- web: Update readme file.

## 0.5.1

- rn: Fix scaling issues.
- rn: Fix React key property error.
- rn: Disable TouchId during login.
- rn: Upgrade the Whorlwind library.
- rn: Add hacked `androidFetch` function to work around Bitpay issue.

## 0.5.0

- web: Re-write the iframe to use the `yaob` bridge added in edge-core-js v0.11.0. This gives the web access to the full core API, including spending.

## 0.4.8

- upgrade to edge-core-js v0.11.1

## 0.4.7

- rn: Use forked react-native-size-matters to fix iPad horizontal

## 0.4.6

- rn: fix f digit pin connector to prevent crash

## 0.4.5

- rn: surfaced rate limits on accountlogin
- rn: add alert for any account on the device that is experiencing a 2fa reset
- rn: fixed removing of usernames from device

## 0.4.3

- rn: upgrade dependencies for rn56 compatibility
- rn: implement AccountOptions
- rn: upgrade core
- rn: created account module scaling

## 0.4.2

- rn: rollback dependencies for rn56 compatibility
- rn: remove auto-translated files from being active

## 0.4.1

- rn: upgrade dependencies for rn56 compatibility

## 0.4.0

- rn: modified text for password recovery.
- rn: changes based on removal of context.io in core

## 0.3.5

- rn: added localization auto detect.
- rn: Machnie translations for Spanish, Portuguese.
- rn: Fix autocorrect bug on username creation
- rn: add firebase
- rn: fix types for imports
- rn: modified text for clarity

## 0.3.4

- rn: added git tag in failed publish attempt

## 0.3.3

- rn: Various font & style fixes.
- web: Fix currency wallet creation.

## 0.3.2

- react: Fix a spelling mistake.
- rn: Fix endless spinning on incorrect OTP login (again).
- web: Implement `createCurrencyWallet`.
- web: Fix Ethereum transaction signing.

## 0.3.1

- rn: Fix endless spinning on incorrect OTP login.

## 0.3.0

- web: Add transaction signing & private-key lockdown mode.
- web: Host iframe contents on the web for easier setup.
- react: Many UI fixes

## 0.2.13

- rn: Expose & fix some sneaky flow errors.

## 0.2.12

- all: Stop using deprecated core API's.
- rn: Add Confirmation Screen for Password Recovery.

## 0.2.11

- web: Fix recovery email contents to refer to "Edge".
- web: Do not show the account settings when they aren't available.
- web: Increase iframe timeouts.
- all: Upgrade edge-core-js to fix errors with really long passwords.

## 0.2.10

- react: Add missing files to the NPM module.
- web: Improve the account-creation screen.
- web: Fix screen height issues.

## 0.2.9

- all: Upgrade edge-login-js.
- web: Update the demo.
- web: Do not wipe out the context user list on login.

## 0.2.8

- web: Re-publish without using buggy Lerna.

## 0.2.7

- web: Re-publish due to Lerna bug.

## 0.2.6

- all: Fix build scripts to work correctly on Windows.
- rn: Fix corrupted header on 2fa screen.
- web: Fix various typos and visual glitches.
- web: Add a user list to the `EdgeUiContext` object.
- web: Rename `EdgeUiAccount.getFirstWallet` to `getFirstWalletInfo`.

## 0.2.5

- web: Re-publish library due to packaging error.

## 0.2.4

- web: Hack the library not to crash in node.js environments.
- react: Upgrade vulnerable moment.js.

## 0.2.3

- Publish `edge-login-ui-web`.
- web: Fix the `copy-edge-assets` script.

## 0.2.2

- Publish `edge-login-ui-react`.
- Fix minor visual glitches on the React Native login screens.
- Begin preparing React Native login screens for localization.

## 0.2.1

- Fix react-native build issues
- Fix the Samsung Note 8 crash

## 0.2.0

- Split the project into two NPM packages

## 0.1.6

- Upgrade to airbitz-core-js v0.3.5, which fixes edge logins.

## 0.1.5

- Upgrade to airbitz-core-js v0.3.4.
- Simplified the `assets` folder path specification.

## 0.1.4

- Upgrade to airbitz-core-js v0.3.3
