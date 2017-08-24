import React from 'react'
import { View, Text } from 'react-native'

const WarningBox = ({ style, message }) => {
  return (
    <View style={style.container}>
      <View style={style.top} />
      <View style={style.bottom}>
        <Text style={style.text}>{message}</Text>
      </View>

    </View>
  )
}

export { WarningBox }
