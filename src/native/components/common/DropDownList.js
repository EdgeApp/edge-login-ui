import React, {Component} from 'react'
import { FlatList } from 'react-native'

class DropDownList extends Component {

  render () {
    return <FlatList
      style={this.props.style}
      data={this.props.data}
      renderItem={this.props.renderRow} />
  }
}

export { DropDownList }
