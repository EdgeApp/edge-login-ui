import React from 'react'
import { View } from 'react-native'

const OverlayBox = ({ children, style }) => {
  return (
    <View>
      <View />
      {children}
    </View>
  )
}
export { OverlayBox }
