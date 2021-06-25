import { writeFileSync } from 'fs'

import strings from './packages/edge-login-ui-rn/src/common/locales/en_US'

writeFileSync(
  './packages/edge-login-ui-rn/src/common/locales/strings/enUS.json',
  JSON.stringify(strings, null, 2)
)
