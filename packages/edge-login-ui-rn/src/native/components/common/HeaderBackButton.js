import React, {Component} from 'react'
import {TouchableOpacity, Platform, Text} from 'react-native'
import { Icon } from 'native-base'

const isIos = Platform.OS === 'ios'

class HeaderBackButton extends Component {
  render () {
    const withArrow = true
    const icon = isIos ? 'ios-arrow-back-outline' : 'md-arrow-back'
    const styles = this.props.styles
    return (
      <TouchableOpacity style={styles.backButton} onPress={this.props.onPress}>
        {withArrow && <Icon size={14} name={icon} style={styles.backIconStyle} />}
        {withArrow && !isIos ? null : <Text style={[styles.sideText]}>{this.props.label}</Text>}
      </TouchableOpacity>
    )
  }
}

export {HeaderBackButton}
