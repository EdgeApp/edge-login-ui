import 'whatwg-fetch'

import { makeContext } from 'edge-login'

const setDocument = () => {
  return {
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
}
const DomWindow = typeof window === 'undefined' ? {} : window
const DomDocument = typeof document === 'undefined' ? setDocument() : document
const createIFrame = function (path) {
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

const removeIFrame = function (frame) {
  frame.parentNode.removeChild(frame)
}

const UIContext = args => {
  // Checking errors
  if (!args.apiKey) {
    throw new Error('Missing api key')
  }
  if (!args.appId && !args.accountType) {
    throw new Error('Missing appId')
  }
  if (args.accountType) {
    console.warn(
      'Please provide Airbitz with an `appId`. The `accountType` is deprecated.'
    )
  }

  const getApiServer = () => {
    if (DomWindow.localStorage) {
      return DomWindow.localStorage.getItem('airbitzAuthServer') || undefined
    }
  }

  const getAssetPath = args => {
    if (args.assetPath) {
      return args.assetsPath
    }
    if (args.bundlePath) {
      return args.bundlePath + '/assets'
    }
    if (!args.assetPath && !args.bundlePath) {
      return './assets'
    }
  }

  if (args.apiKey && args.appId) {
    const airbitzCoreJs = makeContext({
      apiKey: args.apiKey,
      appId: args.appId,
      accountType: args.accountType,
      authServer: getApiServer()
    })

    DomWindow.abcui = {
      assetPath: getAssetPath(args),
      abcuiContext: airbitzCoreJs,
      vendorName: args.vendorName,
      vendorImageUrl: args.vendorImageUrl
    }

    const getABCContext = () => {
      return airbitzCoreJs
    }

    const openLoginWindow = callback => {
      const frame = createIFrame(getAssetPath(args) + '/index.html')
      const removeCallbacks = () => {
        DomWindow.abcui.loginCallback = null
        DomWindow.abcui.loginWithoutClosingCallback = null
        return null
      }
      DomWindow.abcui.loginCallback = (error, account) => {
        if (!account) {
          throw new Error('Account not provided')
        }
        if (account) {
          DomWindow.abcui.abcAccount = account
          callback(error, account)
          removeCallbacks()
          return removeIFrame(frame)
        }
      }
      DomWindow.abcui.loginWithoutClosingCallback = (error, account) => {
        if (!account) {
          throw new Error('Account not provided')
        }
        if (account) {
          DomWindow.abcAccount = account
          callback(error, account)
          return removeCallbacks()
        }
      }
      DomWindow.abcui.exitCallback = () => {
        return removeIFrame(frame)
      }
    }

    const openManageWindow = (account, callback) => {
      const frame = createIFrame(getAssetPath(args) + '/index.html#/account')
      DomWindow.abcui.abcAccount = account
      DomWindow.abcui.exitCallback = () => {
        removeIFrame(frame)
        callback(null)
      }
    }

    return {
      getABCContext,
      openLoginWindow,
      openManageWindow
    }
  }
}

const makeABCUIContext = args => {
  return UIContext(args)
}

export { makeABCUIContext }
