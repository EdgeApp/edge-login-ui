// @flow

import 'regenerator-runtime/runtime'

import URL from 'url-parse'
import { Bridge, bridgifyObject } from 'yaob'

import { makeUiContext } from './context-api.js'
import type {
  BridgeRoot,
  EdgeUiContext,
  EdgeUiContextOptions
} from './index.js'

export function sendRoot () {
  const frameUrl = new URL(window.location)
  const parentUrl = new URL(document.referrer)
  const origin = parentUrl.origin

  const out: BridgeRoot = {
    async makeContext (opts: EdgeUiContextOptions): Promise<EdgeUiContext> {
      if (frameUrl.origin !== parentUrl.origin) opts.hideKeys = true

      return makeUiContext(opts)
    }
  }
  bridgifyObject(out)

  const server = new Bridge({
    sendMessage (message) {
      window.parent.postMessage(JSON.parse(JSON.stringify(message)), origin)
    }
  })

  window.addEventListener('message', event => {
    if (event.origin !== origin) return
    // console.log('frame got', event.data)

    server.handleMessage(event.data)
  })

  server.sendRoot(out)
}
