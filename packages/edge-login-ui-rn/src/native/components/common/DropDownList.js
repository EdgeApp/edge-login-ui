// @flow
import React, { Component } from 'react'
import { FlatList } from 'react-native'

type Props = {
  style: Object,
  data: any,
  renderRow(): void
}
class DropDownList extends Component<Props> {
  keyExtractor: Function
  componentWillMount () {
    this.keyExtractor = (item, index) => index
  }

  render () {
    return (
      <FlatList
        style={this.props.style}
        data={this.props.data}
        renderItem={this.props.renderRow}
        keyExtractor={this.keyExtractor}
      />
    )
  }
}

export { DropDownList }
