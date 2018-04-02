// @flow

import translations from './translations'
import * as KEYS from './traslationKeys'

let language = 'this gets replaced'
// let region = 'this gets replaced'

function setLocal (arg: string, arg2: string) {
  language = arg2
  // region = arg
}

function localize (key: string, array: Array<string> = []) {
  const string = translations[key][language]
  if (array && array.length > 0) {
    // this is where we sfprint the string swaps with a try catch
  }
  return string
}

export { localize, KEYS, setLocal }
