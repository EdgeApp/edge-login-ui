import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const Spinner = (props) => {
  return (
    <View style={props.style}>
      <ActivityIndicator size={props.size || 'large'} />
    </View>
  )
}

export { Spinner }
