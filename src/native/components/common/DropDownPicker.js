/* import React, { Component } from 'react'

import {
  KeyboardAvoidingView,
  ListView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
const DropdownList = props => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  const dataSource = ds.cloneWithRows(props.dataSource)
  const onPress = item => () => props.onPress(item)
  const renderRow = item => (
    <TouchableOpacity style={styles.row} onPress={onPress(item)}>
      <T>{item.label}</T>
    </TouchableOpacity>
  )

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={60}
      contentContainerStyle={props.style}
      behavior={'height'}
    >
      <ListView
        keyboardShouldPersistTaps={'always'}
        style={props.style}
        dataSource={dataSource}
        renderRow={renderRow}
      />
    </KeyboardAvoidingView>
  )
}
export {DropdownList}
 */
