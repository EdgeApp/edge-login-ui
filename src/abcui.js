var abc = require('airbitz-core-js')

var DomWindow
var DomDocument
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
  var frame = DomDocument.createElement('iframe')
  var body = DomDocument.getElementsByTagName('BODY')[0]
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
  var apiKey = args.apiKey
  if (!apiKey) {
    throw Error('Missing api key')
  }
  DomWindow.abcContext = this.abcContext =
    abc.makeContext({'apiKey': args.apiKey, 'accountType': args.accountType})
  if (args['bundlePath']) {
    this.bundlePath = args.bundlePath
  } else {
    this.bundlePath = '/abcui'
  }
  DomWindow.abcuiContext = {
    'vendorName': args.vendorName,
    'bundlePath': this.bundlePath
  }

  if (typeof args.vendorImageUrl === 'string') {
    DomWindow.abcuiContext.vendorImageUrl = args.vendorImageUrl
  } else {
    DomWindow.abcuiContext.vendorImageUrl = ''
  }
}

InnerAbcUi.prototype.openLoginWindow = function (callback) {
  var frame = createIFrame(this.bundlePath + '/assets/index.html')
  var that = this
  var abcContext = DomWindow.abcContext
  DomWindow.loginCallback = function (error, account, opts) {
    if (account) {

      // if (opts && opts.setupRecovery) {
      //   opts.noRequirePassword = true
      //   that.openSetupRecoveryWindow(account, opts, function () {})
      // } else if (!abcContext.pinExists(account.username)) {
      //   that.openChangePinEdgeLoginWindow(account, opts, function () {})
      // }
      DomWindow.abcAccount = account
      callback(error, account)
      setTimeout(function( ){
        removeIFrame(frame)
      }, 20000)
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
  var frame
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
  var frame = createIFrame(this.bundlePath + '/assets/index.html#/account/changepin-edge-login')
  DomWindow.exitCallback = function () {
    removeIFrame(frame)
  }
}

InnerAbcUi.prototype.openManageWindow = function (account, callback) {
  DomWindow.abcAccount = account
  var frame = createIFrame(this.bundlePath + '/assets/index.html#/home/')
  DomWindow.exitCallback = function () {
    removeIFrame(frame)
    callback(null)
  }
}

var abcui = {}
abcui.makeABCUIContext = makeABCUIContext
module.exports = abcui
