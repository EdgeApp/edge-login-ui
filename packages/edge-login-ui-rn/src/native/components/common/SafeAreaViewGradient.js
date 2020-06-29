// @flow

import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const COLORS = ['#0E4B75', '#0D2145']
const UPPER_LEFT = { x: 0, y: 0 }
const UPPER_RIGHT = { x: 1, y: 0 }

type Props = {
  style?: StyleSheet,
  colors?: string[],
  children: any
}

const SafeAreaViewComponent = ({ colors, style, children }: Props) => {
  return (
    <SafeAreaView style={[style, { flex: 1 }]}>
      {children}
      <LinearGradient
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          height: 50,
          zIndex: -1000
        }}
        start={UPPER_LEFT}
        end={UPPER_RIGHT}
        colors={colors || COLORS}
      />
    </SafeAreaView>
  )
}

export default SafeAreaViewComponent
