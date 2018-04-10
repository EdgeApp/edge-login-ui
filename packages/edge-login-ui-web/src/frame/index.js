// @flow

import 'regenerator-runtime/runtime'

import { awaitConnection } from './frame-state.js'

const listener = awaitConnection()

// Close the post-robot listener if our page reloads during development:
// $FlowFixMe
if (module.hot) module.hot.dispose(() => listener.cancel())
