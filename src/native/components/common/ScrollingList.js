import React, { Component } from 'react'
import { View, ListView } from 'react-native'

/* type Props = {
  style: any,
  dataList: Array,
  getListItemsFunction(): void
}
 */
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

export { ScrollingList }
