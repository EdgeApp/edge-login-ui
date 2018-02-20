import * as KEYS from './traslationKeys'
import translations from './translations'

let language = 'this gets replaced'
// let region = 'this gets replaced'

function setLocal (arg, arg2) {
  language = arg2
  // region = arg
}

function localize (arg, array = null) {
  const string = translations[arg][language]
  if (array && array.length > 0) {
    // this is where we sfprint the string swaps with a try catch
  }
  return string
}

export { localize, KEYS, setLocal }
