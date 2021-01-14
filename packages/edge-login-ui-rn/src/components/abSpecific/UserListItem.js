// @flow

import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

type Props = {
  data: string,
  style: Object,
  onClick(string): void,
  onDelete(string): void
}

class UserListItem extends React.Component<Props> {
  deleteThis = () => {
    this.props.onDelete(this.props.data)
  }

  onPress = () => {
    this.props.onClick(this.props.data)
  }

  render() {
    const style = this.props.style
    return (
      <TouchableOpacity onPress={this.onPress}>
        {this.renderInside(style)}
      </TouchableOpacity>
    )
  }

  renderInside(style: Object) {
    if (this.props.onDelete) {
      return (
        <View style={style.container}>
          <View style={style.textComtainer}>
            <Text style={style.text}>{this.props.data}</Text>
          </View>
          <TouchableOpacity
            style={style.iconButton.container}
            onPress={this.deleteThis}
          >
            <MaterialIcon
              style={style.iconButton.icon}
              name="close"
              size={style.iconButton.iconSize}
            />
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={style.container}>
        <Text style={style.text}>{this.props.data}</Text>
      </View>
    )
  }
}

export { UserListItem }
