// @flow

import 'edge-core-js/lib/client-side.js'

import URL from 'url-parse'
import { Bridge } from 'yaob'

import { version } from '../../package.json'
import type {
  BridgeRoot,
  EdgeUiContext,
  EdgeUiContextOptions
} from '../frame/index.js'
import { hideFrame, makeFrame, showFrame } from './iframe.js'

export type { EdgeUiContextOptions, EdgeUiContext }

/**
 * Sets up the iframe, attaches to it, and returns a context API.
 */
export function makeEdgeUiContext (
  opts: EdgeUiContextOptions
): Promise<EdgeUiContext> {
  const {
    assetsPath = `https://developer.airbitz.co/iframe/v${version}/`
  } = opts

  const frameUrl = new URL(assetsPath)
  const origin = frameUrl.origin
  const frame = makeFrame(frameUrl.href)

  const bridge = new Bridge({
    sendMessage (message) {
      frame.contentWindow.postMessage(message, origin)
    }
  })

  window.addEventListener(
    'message',
    event => {
      if (event.origin !== origin) return
      // console.log('client got', event.data)

      bridge.handleMessage(event.data)
    },
    false
  )

  return bridge
    .getRoot()
    .then((root: BridgeRoot) => root.makeContext(opts))
    .then((context: EdgeUiContext) => {
      context.watch(
        'windowVisible',
        visible => (visible ? showFrame(frame) : hideFrame(frame))
      )
      return context
    })
}
