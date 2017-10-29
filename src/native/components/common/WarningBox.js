import React from 'react'
import { View, Text } from 'react-native'
// import {Icon} from './'
// import * as Constants from '../../../common/constants'
// <Icon style={styles.iconStyle} icon={Constants.CLOSE_ICON} size={styles.iconSize} type={Constants.MATERIAL_ICONS} />
const WarningBox = ({ style, message }) => {
  const renderGradient = (styles, icon, iconType) => {
    /* return <View style={[styles.modalHeaderIconWrapBottom]}>
      <Icon style={styles.iconStyle} icon={icon} size={styles.iconSize} type={iconType} />
    </View> */
    return <View style={styles.iconWrapBottom}>
      <View style={styles.iconWrapTop} />
    </View>
  }
  return (
    <View style={style.container}>
      <View style={style.bottom}>
        <Text style={style.text}>{message}</Text>
      </View>
      <View style={style.top} >
        {renderGradient(style)}
      </View>

    </View>
  )
}

export { WarningBox }
