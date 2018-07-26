// @flow
import { moderateScale } from 'react-native-size-matters'

function scale (arg: number) {
  return moderateScale(arg, 0.68)
}

export { scale }
