// @flow

import { makeClientState } from './client-state.js'
import type { ClientState } from './client-state.js'
import { showFrame } from './iframe.js'
import type {
  EdgeLoginWindowOptions,
  EdgeUiContext,
  EdgeUiContextOptions
} from './index.js'

/**
 * Sets up the iframe, attaches to it, and returns a context API.
 */
export function makeEdgeUiContext (
  opts: EdgeUiContextOptions
): Promise<EdgeUiContext> {
  return makeClientState(opts).then(state => makeContextApi(state))
}

/**
 * Returns a context API object with all the required methods.
 */
function makeContextApi (state: ClientState): EdgeUiContext {
  return {
    dispose () {
      state.frame.remove()
    },

    get localUsers () {
      return state.localUsers
    },

    openLoginWindow (opts: EdgeLoginWindowOptions = {}) {
      state.onClose = opts.onClose
      state.onLogin = opts.onLogin
      return state
        .frameDispatch({ type: 'open-login-window' })
        .then(() => showFrame(state.frame))
    }
  }
}
