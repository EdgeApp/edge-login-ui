const abc = require('airbitz-core-js')
import 'whatwg-fetch'

const context = {
  apiKey: '3ad0717b3eb31f745aba7bd9d51e7fd1b2926431',
  appId: 'com.mydomain.myapp',
  localStorage: window.localStorage,
  bundlePath: 'abc-react',
  vendorName: 'Airbitz React Dev',
  vendorImageUrl: 'https://airbitz.co/go/wp-content/uploads/2016/10/GenericEdgeLoginIcon.png'
}

const localContext = (callback) => {
  if (window.abcContext) {
    return callback(window.abcContext)
  }
  if (!window.abcContext) {
    const abcContext = abc.makeContext(context)
    window.abcContext = abcContext
    return callback(abcContext)
  }
}

const abcctx = function (callback) {
  if (window.parent.abcContext) {
    return callback(window.parent.abcContext)
  }
  if (!window.parent.abcContext) {
    return localContext(callback)
  }
}

export default abcctx
