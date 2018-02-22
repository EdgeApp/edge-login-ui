// @flow
import React from 'react'
import { View, ActivityIndicator } from 'react-native'

type Props = {
  style: Object
}
const Spinner = (props: Props) => {
  return (
    <View style={props.style}>
      <ActivityIndicator size={props.size || 'large'} />
    </View>
  )
}

export { Spinner }
