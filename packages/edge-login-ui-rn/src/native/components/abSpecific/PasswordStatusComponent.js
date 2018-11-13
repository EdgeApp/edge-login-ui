// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import s from '../../../common/locales/strings.js'
import {
  PASSWORD_REQ_CHECKED,
  PASSWORD_REQ_UNCHECKED
} from '../../../native/assets'
import { Checkbox } from '../common/Checkbox'

type Props = {
  style: Object,
  secondsToCrack?: string,
  status: Object
}

export default class PaswordStatusComponent extends Component<Props> {
  render () {
    const style = this.props.style
    if (this.props.status) {
      return (
        <View style={style.container}>
          <View style={style.boxes}>{this.renderStatusList(style)}</View>
          <View style={style.textContainer}>
            <Text style={style.text}>{this.props.secondsToCrack}</Text>
          </View>
        </View>
      )
    }
    return (
      <View style={style.containerWhite}>
        <Text style={style.instructions}>{s.strings.password_desc}</Text>
      </View>
    )
  }
  onChange = () => {
    // do nothing
  }
  renderStatusList (style: Object) {
    return this.props.status.list.map(Item => (
      <View style={style.checkboxContainer} key={Item.title}>
        <Checkbox
          style={style.checkboxes}
          label={Item.title}
          value={Item.value}
          isSelected={false}
          onChange={this.onChange}
          checkedImage={PASSWORD_REQ_CHECKED}
          uncheckedImage={PASSWORD_REQ_UNCHECKED}
          disabled
        />
      </View>
    ))
  }
}
