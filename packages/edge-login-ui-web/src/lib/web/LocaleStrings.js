import defaultLang from '../../locales/default'
import enPH from '../../locales/en_PH'
const supportedLocales = {
  en_PH: enPH
}

const LocaleStrings = function (inputKey, reqLocale) {
  // if no locale specified, use device
  if (!reqLocale) {
    reqLocale =
      navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language
  }
  const localeFormatted = reqLocale.replace('-', '_') // in iOS, locales are - so we standardize to android

  let localeStrings = defaultLang
  if (supportedLocales[localeFormatted]) {
    localeStrings = supportedLocales[localeFormatted]
  }

  if (localeStrings[inputKey] !== undefined) {
    return localeStrings[inputKey]
  } else if (defaultLang[inputKey] !== undefined) {
    return defaultLang[inputKey]
  } else {
    return '???-' + inputKey + '-???'
  }
}

export default LocaleStrings
