// @flow

import * as React from 'react'
import { View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../services/ThemeContext'
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
    </View>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: theme.thinLineWidth,
    borderBottomColor: theme.lineDivider,
    marginLeft: theme.rem(1),
    marginBottom: theme.rem(0.5),
    paddingBottom: theme.rem(1.5)
  },
  text: {
    fontSize: theme.rem(1.25),
    fontFamily: theme.fontFaceBold,
    flex: 1
  }
}))

export const SimpleSceneHeader = withTheme(SimpleSceneHeaderComponent)
