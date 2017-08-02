const abc = require('airbitz-core-js')

import LocalStorage from './LocalStorage'

const abcctx = function (callback) {
  if (!global.localStorage) {
    /* eslint-disable no-unused-vars */
    const noop = new LocalStorage('/db.json', function (ls) {
      global.localStorage = ls
      global.abcContext = abc.makeContext({
        apiKey: '3ad0717b3eb31f745aba7bd9d51e7fd1b2926431',
        appId: 'com.mydomain.myapp',
        localStorage: global.localStorage
      })
      /* eslint-enable no-unused-vars */
      callback(global.abcContext)
    })
    return false
  } else {
    return callback(global.abcContext)
  }
}

export default abcctx
