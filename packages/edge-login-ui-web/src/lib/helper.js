export const validateEmail = email => {
  const string = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
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

export const calculateTime = second => {
  const roundOff = num => Math.round(num * 100) / 100
  const minute = 60
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30
  const year = month * 12
  const decade = year * 10
  const century = decade * 10
  const millenium = century * 10
  const toomuch = millenium * 1000000

  if (second < minute) {
    return second + ' seconds'
  }
  if (second > minute && second < hour) {
    return roundOff(second / minute) + ' minutes'
  }
  if (second > hour && second < day) {
    return roundOff(second / hour) + ' hours'
  }
  if (second > day && second < week) {
    return roundOff(second / day) + ' days'
  }
  if (second > week && second < month) {
    return roundOff(second / week) + ' weeks'
  }
  if (second > month && second < year) {
    return roundOff(second / month) + ' months'
  }
  if (second > year && second < decade) {
    return roundOff(second / year) + ' years'
  }
  if (second > decade && second < century) {
    return roundOff(second / decade) + ' decades'
  }
  if (second > century && second < millenium) {
    return roundOff(second / century) + ' centuries'
  }
  if (second > millenium && second < toomuch) {
    return roundOff(second / decade) + ' millennia'
  }
  if (second > toomuch) {
    return 'The world has ended, but your password still stands'
  }
}
