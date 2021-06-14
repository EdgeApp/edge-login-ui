// @flow

import * as React from 'react'
import { View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../services/ThemeContext'
import { Divider } from '../themed/Divider'
import { EdgeText } from '../themed/EdgeText'

type Props = {
  children: React.Node
}

const SimpleSceneHeaderComponent = ({
  children,
  theme
}: Props & ThemeProps) => {
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <EdgeText style={styles.text}>{children}</EdgeText>
      <Divider />
    </View>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    marginLeft: theme.rem(0.5)
  },
  text: {
    fontSize: theme.rem(1.25),
    fontFamily: theme.fontFaceBold
  }
}))

export const SimpleSceneHeader = withTheme(SimpleSceneHeaderComponent)
