// @flow

import { Dimensions, Platform } from 'react-native'

const { height, width } = Dimensions.get('window')
const isIphoneX: boolean =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 || width === 812 || (height === 896 || width === 896))

export { isIphoneX }
