// @flow

import React, { Component } from 'react'
import { FlatList } from 'react-native'

type Props = {
  style: Object,
  data: any,
  renderRow(): void
}
class DropDownList extends Component<Props> {
  render () {
    return (
      <FlatList
        style={this.props.style}
        data={this.props.data}
        renderItem={this.props.renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }
}

export { DropDownList }
