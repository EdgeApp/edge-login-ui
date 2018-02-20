import React from 'react'
import { SafeAreaView } from 'react-native'

type props = {
  style: any,
  children: any
}

const SafeAreaViewComponent = ({ style, children }: props) => {
  return <SafeAreaView style={[style, { flex: 1 }]}>{children}</SafeAreaView>
}

export default SafeAreaViewComponent
