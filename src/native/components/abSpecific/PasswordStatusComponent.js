import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'
import { Checkbox } from '../common/Checkbox'
import {
  PASSWORD_REQ_CHECKED,
  PASSWORD_REQ_UNCHECKED
} from '../../../native/assets'

export default class PaswordStatusComponent extends Component {
  componentWillMount () {}
  render () {
    return this.renderInterior()
  }
  renderStatusList () {
    const style = this.props.style
    return this.props.status.list.map(Item => (
      <View style={style.checkboxContainer} key={Item.title}>
        <Checkbox
          style={style.checkboxes}
          label={Item.title}
          defaultValue={Item.value}
          checkedImage={PASSWORD_REQ_CHECKED}
          uncheckedImage={PASSWORD_REQ_UNCHECKED}
          disabled
        />
      </View>
    ))
  }
  renderInterior () {
    console.log('HERE IS THE THING ')
    console.log(this.props.status)
    const style = this.props.style
    if (this.props.status) {
      return (
        <View style={style.container}>
          {this.renderStatusList()}
          <View>
            <Text style={style.text}>{this.props.status.secondsToCrack} </Text>
          </View>
        </View>
      )
    }
    return (
      <View style={style.container}>
        <Text style={style.instructions}>
          This is a whole lot of instructions
        </Text>
      </View>
    )
  }
}
PaswordStatusComponent.propTypes = {
  style: PropTypes.object.isRequired,
  status: PropTypes.object
}
