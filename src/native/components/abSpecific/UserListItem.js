import React, { Component, PropTypes } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

class UserListItem extends Component {
  render () {
    const Style = this.props.style
    return (
      <TouchableOpacity onPress={this.onPress.bind(this)}>
        <View style={Style.container}>
          <Text style={Style.text}>{this.props.data}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  onPress () {
    this.props.onClick(this.props.data)
  }
}

UserListItem.propTypes = {
  data: PropTypes.string,
  style: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export { UserListItem }
