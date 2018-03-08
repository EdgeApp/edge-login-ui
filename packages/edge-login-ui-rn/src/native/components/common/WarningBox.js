// @flow

import React from 'react'
import { Text, View } from 'react-native'

import * as Constants from '../../../common/constants'
import { Icon } from './'

type Props = {
  style: Object,
  message: string
}

const WarningBox = ({ style, message }: Props) => {
  const renderGradient = (styles, icon, iconType) => {
    return (
      <View style={styles.iconWrapBottom}>
        <Icon
          style={styles.iconStyle}
          name={Constants.EXCLAMATION}
          size={styles.iconSize}
          type={Constants.EVIL_ICONS}
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
