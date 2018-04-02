// @flow

import React from 'react'
import { View } from 'react-native'

type Props = {
  children: any,
  syle: Object
}
const OverlayBox = ({ children, style }: Props) => {
  return (
    <View>
      <View />
      {children}
    </View>
  )
}
export { OverlayBox }
