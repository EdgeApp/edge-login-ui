import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'

export default class PaswordStatusComponent extends Component {
  render () {
    const style = this.props.style
    return (
      <View style={style.container}>
        {this.renderInterior()}
      </View>
    )
  }
  renderStatusList () {
    return <View />
  }
  renderInterior () {
    if (this.props.status) {
      return this.renderStatusList()
    }
    const style = this.props.style
    return (
      <View>
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
