// @flow

import React from 'react'
import { Text, View } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

type Props = {
  style: Object,
  message: string
}

const WarningBox = ({ style, message }: Props) => {
  const renderGradient = (styles, icon, iconType) => {
    return (
      <View style={styles.iconWrapBottom}>
        <EvilIcons
          name="exclamation"
          style={styles.iconStyle}
          size={styles.iconSize}
        />
      </View>
    )
  }
  return (
    <View style={style.container}>
      <View style={style.bottom}>
        <Text style={style.text}>{message}</Text>
      </View>
      <View style={style.top}>{renderGradient(style)}</View>
    </View>
  )
}

export { WarningBox }
