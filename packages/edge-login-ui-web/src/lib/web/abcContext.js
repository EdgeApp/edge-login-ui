import 'whatwg-fetch'
const abc = require('../../abcui.js')

const context = {
  apiKey: '3ad0717b3eb31f745aba7bd9d51e7fd1b2926431',
  appId: 'com.mydomain.myapp',
  bundlePath: 'abc-react',
  vendorName: 'Edge React Dev',
  vendorImageUrl:
    'https://airbitz.co/go/wp-content/uploads/2016/10/GenericEdgeLoginIcon.png'
}

const abcctx = callback => {
  const abcuiContext = window.parent.abcui
    ? window.parent.abcui.abcuiContext
    : null
  return callback(abcuiContext || abc.makeABCUIContext(context).getABCContext())
}

export default abcctx
