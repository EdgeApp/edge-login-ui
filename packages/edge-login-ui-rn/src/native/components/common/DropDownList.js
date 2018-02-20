import React, { Component } from 'react'
import { FlatList } from 'react-native'

class DropDownList extends Component {
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
