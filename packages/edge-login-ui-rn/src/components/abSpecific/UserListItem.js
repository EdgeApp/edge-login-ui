// @flow

import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import * as Constants from '../../constants/index.js'
import { IconButton } from '../common/IconButton.js'

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
          <IconButton
            style={style.iconButton}
            icon={Constants.CLOSE_ICON}
            iconType={Constants.MATERIAL_ICONS}
            onPress={this.deleteThis}
          />
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
