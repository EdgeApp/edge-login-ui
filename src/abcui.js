const abc = require('airbitz-core-js')
import 'whatwg-fetch'

let DomWindow
let DomDocument
if (typeof (window) === 'undefined') {
  DomWindow = {}
} else {
  DomWindow = window
}
if (typeof (document) === 'undefined') {
  DomDocument = {
    createElement: function () {
      console.log('createElement: Error browser routine used in non-browser environment')
    },
    getElementsByTagName: function () {
      console.log('getElementsByTagName: Error browser routine used in non-browser environment')
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
  frame.setAttribute('style', 'border: 0px none transparent; overflow: hidden; visibility: visible; margin: 0px; padding: 0px; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 9999; display: block; background: transparent;')
  return frame
}

function removeIFrame (frame) {
  frame.parentNode.removeChild(frame)
}

function makeABCUIContext (args) {
  return new InnerAbcUi(args)
}

function InnerAbcUi (args) {
  if (args.apiKey == null) {
    throw Error('Missing api key')
  }

  // Figure out which server to use:
  let airbitzAuthServer
  if (DomWindow.localStorage != null) {
    const value = DomWindow.localStorage.getItem('airbitzAuthServer')
    if (value != null) {
      airbitzAuthServer = value
    }
  }

  // Make the core context:
  this.abcContext = abc.makeContext({
    apiKey: args.apiKey,
    accountType: args.accountType,
    authServer: airbitzAuthServer
  })
  this.abcContext.displayName = args.vendorName
  this.abcContext.displayImageUrl = args.vendorImageUrl
  DomWindow.abcContext = this.abcContext

  // Set up the UI context:
  if (args['bundlePath']) {
    this.bundlePath = args.bundlePath
  } else {
    this.bundlePath = '/abcui'
  }
  DomWindow.abcuiContext = {
    vendorName: args.vendorName,
    bundlePath: this.bundlePath
  }
}

InnerAbcUi.prototype.openLoginWindow = function (callback) {
  const frame = createIFrame(this.bundlePath + '/assets/index.html')
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

InnerAbcUi.prototype.getABCContext = function () {
  return this.abcContext
}

InnerAbcUi.prototype.openRecoveryWindow = function (callback) {
  createIFrame(this.bundlePath + '/assets/index.html#/recovery')
}

InnerAbcUi.prototype.openSetupRecoveryWindow = function (account, opts, callback) {
  let frame
  if (opts && opts.noRequirePassword) {
    frame = createIFrame(this.bundlePath + '/assets/index.html#/account/setuprecovery-nopassword')
  } else {
    frame = createIFrame(this.bundlePath + '/assets/index.html#/account/setuprecovery')
  }
  DomWindow.exitCallback = function () {
    removeIFrame(frame)
  }
}

InnerAbcUi.prototype.openChangePinEdgeLoginWindow = function (account, callback) {
  const frame = createIFrame(this.bundlePath + '/assets/index.html#/account/changepin-edge-login')
  DomWindow.exitCallback = function () {
    removeIFrame(frame)
  }
}

InnerAbcUi.prototype.openManageWindow = function (account, callback) {
  DomWindow.abcAccount = account
  const frame = createIFrame(this.bundlePath + '/assets/index.html#/home/')
  DomWindow.exitCallback = function () {
    removeIFrame(frame)
    callback(null)
  }
}

const abcui = {}
abcui.makeABCUIContext = makeABCUIContext
module.exports = abcui
