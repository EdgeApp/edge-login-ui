const fs = require('fs')
const masterStrings = require('./packages/edge-login-ui-rn/src/common/locales/en_US.js')
fs.writeFileSync(
  './packages/edge-login-ui-rn/src/common/locales/strings/enUS.json',
  JSON.stringify(masterStrings, null, 2)
)
