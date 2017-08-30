import React, { Component, PropTypes } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Button } from '../common'

class UserListItem extends Component {
  render () {
    const Style = this.props.style
    return (
      <TouchableOpacity onPress={this.onPress.bind(this)}>
        {this.renderInside(Style)}
      </TouchableOpacity>
    )
  }
  renderInside (Style) {
    if (this.props.onDelete) {
      return (
        <View style={Style.container}>
          <Text style={Style.text}>{this.props.data}</Text>
          <Button
            onPress={this.deleteThis.bind(this)}
            label={'X'}
            downStyle={Style.deleteButton.downStyle}
            downTextStyle={Style.deleteButton.downTextStyle}
            upStyle={Style.deleteButton.upStyle}
            upTextStyle={Style.deleteButton.upTextStyle}
          />
        </View>
      )
    }
    return (
      <View style={Style.container}>
        <Text style={Style.text}>{this.props.data}</Text>
      </View>
    )
  }
  deleteThis () {
    this.props.onDelete(this.props.data)
  }
  onPress () {
    this.props.onClick(this.props.data)
  }
}

UserListItem.propTypes = {
  data: PropTypes.string,
  style: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func
}

export { UserListItem }
