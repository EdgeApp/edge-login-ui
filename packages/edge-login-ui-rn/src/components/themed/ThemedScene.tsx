import * as React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { fixSides, mapSides, sidesToPadding } from '../../util/sides'
import { useTheme } from '../services/ThemeContext'
import { Header } from './Header'
import { SimpleSceneHeader } from './SimpleSceneHeader'

interface Props {
  // Header:
  showHeader?: boolean
  topLeft?: { type: 'back' | 'skip' | 'help' | 'exit'; onClick: () => void }
  topRight?: { type: 'menu'; onClick: () => void }
  topMiddle?: string | React.ReactNode
  titleText?: string
  // subTitleText?: string //  Don't know what this is for yet
  children?: React.ReactNode

  // Padding:
  paddingRem?: number | number[]
  innerPaddingRem?: number | number[]
}

const UPPER_LEFT = { x: 0, y: 0 }
const UPPER_RIGHT = { x: 1, y: 0 }

export function ThemedScene(props: Props) {
  const {
    children,
    innerPaddingRem,
    paddingRem,
    showHeader,
    titleText,
    topLeft,
    topMiddle,
    topRight
  } = props
  const theme = useTheme()

  function containerStyle(paddingRem: number | number[]) {
    return {
      flex: 1,
      ...sidesToPadding(mapSides(fixSides(paddingRem, 1), theme.rem))
    }
  }

  return (
    <>
      <LinearGradient
        style={StyleSheet.absoluteFill}
        start={UPPER_LEFT}
        end={UPPER_RIGHT}
        colors={[theme.backgroundGradientLeft, theme.backgroundGradientRight]}
      />
      <SafeAreaView style={containerStyle(paddingRem ?? 1)}>
        {showHeader ? (
          <Header topLeft={topLeft} topRight={topRight} topMiddle={topMiddle} marginRem={[0, 0, 1, 0]}/>
        ) : null}
        {titleText != null ? (
          <SimpleSceneHeader>{titleText}</SimpleSceneHeader>
        ) : null}
        <View style={containerStyle(innerPaddingRem ?? 0.5)}>{children}</View>
      </SafeAreaView>
    </>
  )
}
