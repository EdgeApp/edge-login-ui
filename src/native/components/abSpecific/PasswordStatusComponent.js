import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Checkbox } from '../common/Checkbox'
import {
  PASSWORD_REQ_CHECKED,
  PASSWORD_REQ_UNCHECKED
} from '../../../native/assets'

/* type Props = {
  style: any,
  status: any
}
 */
export default class PaswordStatusComponent extends Component {
  componentWillMount () {}
  render () {
    return this.renderInterior()
  }
  renderStatusList (style) {
    return this.props.status.list.map(Item => (
      <View style={style.checkboxContainer} key={Item.title}>
        <Checkbox
          style={style.checkboxes}
          label={Item.title}
          value={Item.value}
          checkedImage={PASSWORD_REQ_CHECKED}
          uncheckedImage={PASSWORD_REQ_UNCHECKED}
          disabled
        />
      </View>
    ))
  }
  renderInterior () {
    const style = this.props.style
    if (this.props.status) {
      return (
        <View style={style.container}>
          <View style={style.boxes}>
            {this.renderStatusList(style)}
          </View>
          <View style={style.textContianer}>
            <Text style={style.text}>{this.props.secondsToCrack} </Text>
          </View>
        </View>
      )
    }
    return (
      <View style={style.container}>
        <Text style={style.instructions}>
          The password is used to login and change sensitive settings
        </Text>
      </View>
    )
  }
}

