// @flow

import React, { Component } from 'react'
import { TouchableOpacity, Platform, Text } from 'react-native'
import { Icon } from 'native-base'

const isIos = Platform.OS === 'ios'

type Props = {
  styles: Object,
  label: string,
  onPress(): void
}
class HeaderBackButton extends Component<Props> {
  render () {
    const withArrow = true
    const icon = isIos ? 'ios-arrow-back-outline' : 'md-arrow-back'
    const styles = this.props.styles
    return (
      <TouchableOpacity style={styles.backButton} onPress={this.props.onPress}>
        {withArrow && (
          <Icon size={14} name={icon} style={styles.backIconStyle} />
        )}
        {withArrow && !isIos ? null : (
          <Text style={[styles.sideText]}>{this.props.label}</Text>
        )}
      </TouchableOpacity>
    )
  }
}

export { HeaderBackButton }
