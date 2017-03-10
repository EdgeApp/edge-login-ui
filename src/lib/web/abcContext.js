const abc = require('airbitz-core-js')

const abcctx = function (callback) {
  if(window.parent.abcContext){
    callback(window.parent.abcContext)
  }

  if(!window.parent.abcContext){
    const abcContext = abc.makeContext({
      apiKey        : '3ad0717b3eb31f745aba7bd9d51e7fd1b2926431',
      accountType   : 'account:repo:co.airbitz.wallet',
      localStorage  : window.localStorage,
      bundlePath    : 'abc-react',
      vendorName    : 'Airbitz React',
      vendorImageUrl: 'https://airbitz.co/go/wp-content/uploads/2016/10/GenericEdgeLoginIcon.png'

    })
    callback(abcContext)
  }
}

export default abcctx
