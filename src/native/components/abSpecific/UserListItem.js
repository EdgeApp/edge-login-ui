import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { IconButton } from '../common'
import * as Constants from '../../../common/constants'
/* type Props= {
  data: any,
  style: any,
  onClick():void,
  onDelete():void
} */

class UserListItem extends Component {
  componentWillMount () {
    this.deleteThis = () => {
      this.props.onDelete(this.props.data)
    }
    this.onPress = () => {
      this.props.onClick(this.props.data)
    }
  }
  render () {
    const Style = this.props.style
    return (
      <TouchableOpacity onPress={this.onPress}>
        {this.renderInside(Style)}
      </TouchableOpacity>
    )
  }
  renderInside (Style) {
    if (this.props.onDelete) {
      return (
        <View style={Style.container}>
          <View style={Style.textComtainer} >
            <Text style={Style.text}>{this.props.data}</Text>
          </View>
          <IconButton
            style={Style.iconButton}
            icon={Constants.CLOSE_ICON}
            iconType={Constants.MATERIAL_ICONS}
            onPress={this.deleteThis} />
        </View>
      )
    }
    return (
      <View style={Style.container}>
        <Text style={Style.text}>{this.props.data}</Text>
      </View>
    )
  }
}

export { UserListItem }
