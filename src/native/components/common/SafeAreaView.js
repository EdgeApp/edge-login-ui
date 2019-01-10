// @flow

import React from 'react'
import { SafeAreaView } from 'react-native'

type Props = {
  style?: any,
  children: any
}

const SafeAreaViewComponent = ({ style, children }: Props) => {
  return <SafeAreaView style={[style, { flex: 1 }]}>{children}</SafeAreaView>
}

export default SafeAreaViewComponent
