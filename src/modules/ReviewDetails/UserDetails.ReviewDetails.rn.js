import React, { Component } from 'react'
import { View, Text } from 'react-native'
import t from '../../lib/LocaleStrings'
import style from './ReviewDetails.style'

export default class Details extends Component {
  render () {
    return (
      <View style={style.detailsContainer}>
        <View style={style.detailRow}>
          <Text style={[ style.text, style.detailText, style.detailTextLeft ]}>{t('string_username_with_colon')}</Text>
          <Text style={[ style.text, style.detailText, style.detailTextRight ]}>{this.props.username}</Text>
        </View>
        <View style={style.detailRow}>
          <Text style={[ style.text, style.detailText, style.detailTextLeft ]}>{t('string_pin_with_colon')}</Text>
          <Text style={[ style.text, style.detailText, style.detailTextRight ]}>{this.props.pinNumber}</Text>
        </View>
        <View style={style.detailRow}>
          <Text style={[ style.text, style.detailText, style.detailTextLeft ]}>{t('string_password_with_colon')}</Text>
          <Text style={[ style.text, style.detailText, style.detailTextRight ]}>{this.props.password}</Text>
        </View>
      </View>
    )
  }
}
