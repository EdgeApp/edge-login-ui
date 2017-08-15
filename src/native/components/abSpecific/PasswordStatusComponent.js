import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'
import { Checkbox } from '../common/Checkbox'

export default class PaswordStatusComponent extends Component {
  componentWillMount () {}
  render () {
    const style = this.props.style
    return (
      <View style={style.container}>
        {this.renderInterior()}
      </View>
    )
  }
  renderStatusList () {
    const style = this.props.style
    return this.props.status.list.map(Item => (
      <View style={style.checkboxContainer} key={Item.title}>
        <Checkbox
          style={style.checkboxes}
          label={Item.title}
          defaultValue={Item.value}
          disabled
        />
      </View>
    ))
  }
  renderInterior () {
    const style = this.props.style
    if (this.props.status) {
      return (
        <View
          style={{
            flex: 1,
            height: 100,
            width: '100%',
            backgroundColor: '#FFCC00'
          }}
        >
          {this.renderStatusList()}
        </View>
      )
    }
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
