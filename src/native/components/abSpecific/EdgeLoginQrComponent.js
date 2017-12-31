import React, { Component } from 'react'
import { View } from 'react-native'

class EdgeLoginQrComponent extends Component {
  componentDidMount () {
    this.props.getQrCode()
  }
  render () {
    const style = this.props.style
    return <View style={style.container} />
  }
}

export { EdgeLoginQrComponent }
