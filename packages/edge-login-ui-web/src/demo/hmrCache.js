let hmrCache

/**
 * Saves and restores the root component's state each time the dev server
 * reloads the page. This is basically a cheaper and simpler version of what
 * `react-hot-loader` would be doing.
 */
export function restoreCachedState(module, component) {
  component.state = hmrCache

  if (module.hot) {
    module.hot.dispose(() => (hmrCache = component.state))
  }

  return hmrCache
}
