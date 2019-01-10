// @flow

import React, { Component } from 'react'
import { ListView, View } from 'react-native'

type Props = {
  style: Object,
  dataList: Array<any>,
  getListItemsFunction(any): void
}
class ScrollingList extends Component<Props> {
  dataSource: any
  constructor (props: Props) {
    super(props)
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
  renderRow (item: any) {
    return this.props.getListItemsFunction(item)
  }
}

export { ScrollingList }
