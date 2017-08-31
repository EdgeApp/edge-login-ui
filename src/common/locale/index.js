import * as KEYS from './traslationKeys'
import translations from './translations'

let language = 'this gets replaced'
// let region = 'this gets replaced'

function setLocal (arg, arg2) {
  language = arg2
  // region = arg
}

function localize (arg) {
  return translations[arg][language]
}

export { localize, KEYS, setLocal }
