import { makeContext } from 'edge-login'
import 'whatwg-fetch'

let DomWindow
let DomDocument
if (typeof window === 'undefined') {
  DomWindow = {}
} else {
  DomWindow = window
}
if (typeof document === 'undefined') {
  DomDocument = {
    createElement: function () {
      console.log(
        'createElement: Error browser routine used in non-browser environment'
      )
    },
    getElementsByTagName: function () {
      console.log(
        'getElementsByTagName: Error browser routine used in non-browser environment'
      )
    }
  }
} else {
  DomDocument = document
}
function createIFrame (path) {
  const frame = DomDocument.createElement('iframe')
  const body = DomDocument.getElementsByTagName('BODY')[0]
  body.appendChild(frame, body)
  frame.setAttribute('src', path)
  frame.setAttribute('frameborder', '0')
  frame.setAttribute('allowtransparency', 'true')
  frame.setAttribute(
    'style',
    'border: 0px none transparent; overflow: hidden; visibility: visible; margin: 0px; padding: 0px; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 9999; display: block; background: transparent;'
  )
  return frame
}

function removeIFrame (frame) {
  frame.parentNode.removeChild(frame)
}

export function makeABCUIContext (args) {
  return new UIContext(args)
}

class UIContext {
  constructor (args) {
    const opts = {}

    // API key:
    if (args.apiKey == null) {
      throw new Error('Missing api key')
    }
    opts.apiKey = args.apiKey

    // appId:
    if (args.appId != null) {
      opts.appId = args.appId
    } else if (args.accountType != null) {
      opts.accountType = args.accountType
      console.warn(
        'Please provide Airbitz with an `appId`. The `accountType` is deprecated.'
      )
    } else {
      throw new Error('Missing appId')
    }

    // Figure out which server to use:
    if (DomWindow.localStorage != null) {
      const value = DomWindow.localStorage.getItem('airbitzAuthServer')
      if (value != null) {
        opts.authServer = value
      }
    }

    // Make the core context:
    this.abcContext = makeContext(opts)
    this.abcContext.displayName = args.vendorName
    this.abcContext.displayImageUrl = args.vendorImageUrl
    DomWindow.abcContext = this.abcContext

    // Set up the UI context:
    if (args.assetPath != null) {
      this.assetsPath = args.assetsPath
    } else if (args.bundlePath != null) {
      this.assetsPath = args.bundlePath + '/assets'
    } else {
      this.assetsPath = './assets'
    }

    DomWindow.abcuiContext = {
      vendorName: args.vendorName,
      assetsPath: this.assetsPath
    }
  }

  openLoginWindow (callback) {
    const frame = createIFrame(this.assetsPath + '/index.html')
    const done = () => {
      DomWindow.loginCallback = null
      removeIFrame(frame)
    }
    DomWindow.loginCallback = function (error, account) {
      if (account) {
        DomWindow.abcAccount = account
        callback(error, account)
        done()
      }
    }
    DomWindow.exitCallback = function () {
      removeIFrame(frame)
    }
  }

  getABCContext () {
    return this.abcContext
  }

  openRecoveryWindow (callback) {
    createIFrame(this.assetsPath + '/index.html#/recovery')
  }

  openSetupRecoveryWindow (account, opts, callback) {
    let frame
    if (opts && opts.noRequirePassword) {
      frame = createIFrame(
        this.assetsPath + '/index.html#/account/setuprecovery-nopassword'
      )
    } else {
      frame = createIFrame(
        this.assetsPath + '/index.html#/account/setuprecovery'
      )
    }
    DomWindow.exitCallback = function () {
      removeIFrame(frame)
    }
  }

  openChangePinEdgeLoginWindow (account, callback) {
    const frame = createIFrame(
      this.assetsPath + '/index.html#/account/changepin-edge-login'
    )
    DomWindow.exitCallback = function () {
      removeIFrame(frame)
    }
  }

  openManageWindow (account, callback) {
    DomWindow.abcAccount = account
    const frame = createIFrame(this.assetsPath + '/index.html#/home/')
    DomWindow.exitCallback = function () {
      removeIFrame(frame)
      callback(null)
    }
  }
}
