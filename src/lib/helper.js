export const validateEmail = email => {
  const string = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return string.test(email)
}

export const obfuscateUsername = username => {
  if (username.length <= 3) {
      return username.substr(0, username.length - 1) + '*'
    } else if (username.length <= 6) {
      return username.substr(0, username.length - 2) + '**'
    } else if (username.length <= 9) {
      return username.substr(0, username.length - 3) + '***'
    } else if (username.length <= 12) {
      return username.substr(0, username.length - 4) + '****'
    } else {
      return username.substr(0, username.length - 5) + '*****'
    }
}
