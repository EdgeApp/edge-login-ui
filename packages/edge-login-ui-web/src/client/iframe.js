// @flow

const styleString =
  'border: 0px none transparent; overflow: hidden; margin: 0px; padding: 0px; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 9999;background: transparent;'

const hiddenString = 'display: none'
const visibleString = 'display: block'

/**
 * Creates an iframe under the main window.
 */
export function makeFrame(path: string): HTMLIFrameElement {
  if (document == null) {
    throw new Error('This code can only run in a web browser')
  }

  const frame = document.createElement('iframe')
  frame.setAttribute('src', path)
  frame.setAttribute('frameborder', '0')
  frame.setAttribute('allowtransparency', 'true')
  frame.setAttribute('style', styleString + hiddenString)

  // Add the frame to the document:
  if (!document.body) {
    throw new Error(
      'No <body> element - please call makeEdgeUiContext once the page has loaded'
    )
  }
  document.body.appendChild(frame)

  return frame
}

export function hideFrame(frame: HTMLIFrameElement) {
  frame.setAttribute('style', styleString + hiddenString)
}

export function showFrame(frame: HTMLIFrameElement) {
  frame.setAttribute('style', styleString + visibleString)
}
