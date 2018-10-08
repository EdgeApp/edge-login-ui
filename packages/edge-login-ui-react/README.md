# Edge Login UI React Components

This library exports a collection of React components which implement the Edge login user interface. These components are currently compatible with the web version of React, but we will eventually merge the React Native components into this library as well.

If you are building your project for the web, consider using `edge-login-ui-web` instead of this library. That library bundles these components in a way that provides a simpler coding interface and better security.

# Usage

Install this library into your project using a tool like NPM or Yarn, and then import it into your project:

```js
import { LoginScreen, AccountScreen } from "edge-login-ui-react";
```

You will also have to import `edge-login-ui-react/lib/styles.css` into your HTML for these components to receive the proper CSS styling. You will also need the following line for mobile responsiveness:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This library provides the following components:

- LoginScreen - Provides the ability to create or log into accounts.
- AccountScreen - Provides controls for changing the credentials on an account.

You can render them in the normal way:

```js
// Inside some React component:
render () {
  return (
    <LoginScreen
      accountOptions={{}}
      context={this.props.context}
      onClose={this.onClose}
      onError={this.onError}
      onLogin={this.onLogin}
      vendorName={strings.APP_NAME}
      vendorImageUrl={strings.APP_LOGO}
    />
  )
}
```

## LoginScreen

The `LoginScreen` component accepts the following props:

- `accountOptions` - An `EdgeAccountOptions` structure to pass to the `EdgeAccount` object on login.
- `context` - An `EdgeContext` object, created using the `makeEdgeAccount` function from [edge-core-js](https://github.com/Airbitz/edge-core-js).
- `onClose` - Called when the user closes the window.
- `onError` - Called if the screen encounters an error.
- `onLogin` - Receives an `EdgeAccount` object when the user logs in.
- `vendorImageUrl` - A logo to display at the top of the window.
- `vendorName` - An application name to display in the window.

## AccountScreen

The `AccountScreen` component accepts the following props:

- `account` - An `EdgeAccount` object for the logged-in user.
- `context` - The `EdgeContext` that was used to log the user in.
- `onClose` - Called when the user closes the window.
- `onError` - Called if the screen encounters an error.
- `vendorImageUrl` - A logo to display at the top of the window.
- `vendorName` - An application name to display in the window.

# Contributing

Run `yarn` to install the project depenencies and perform the initial build. Then use `yarn start` to launch a development server.
