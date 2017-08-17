import React, { Component, PropTypes } from 'react'
import { View, ListView } from 'react-native'

class ScrollingList extends Component {
  componentWillMount () {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.dataSource = ds.cloneWithRows(this.props.dataList)
  }
  render () {
    return (
      <View style={this.props.style}>
        <ListView
          dataSource={this.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    )
  }
  renderRow (item) {
    return this.props.getListItemsFunction(item)
  }
}

ScrollingList.propTypes = {
  style: PropTypes.object.isRequired,
  getListItemsFunction: PropTypes.func.isRequired,
  dataList: PropTypes.array.isRequired
}

export { ScrollingList }
