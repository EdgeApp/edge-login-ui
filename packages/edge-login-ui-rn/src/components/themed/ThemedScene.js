// @flow

import * as React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { useTheme } from '../services/ThemeContext'

type Props = {
  children?: React.Node
}

const UPPER_LEFT = { x: 0, y: 0 }
const UPPER_RIGHT = { x: 1, y: 0 }

export function ThemedScene(props: Props) {
  const { children } = props
  const theme = useTheme()

  return (
    <>
      <LinearGradient
        style={StyleSheet.absoluteFill}
        start={UPPER_LEFT}
        end={UPPER_RIGHT}
        colors={[theme.backgroundGradientLeft, theme.backgroundGradientRight]}
      />
      <SafeAreaView style={{ flexGrow: 1 }}>{children}</SafeAreaView>
    </>
  )
}
