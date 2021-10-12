import * as React from 'react'
import { Image, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import { Theme, ThemeProps, withTheme } from '../services/ThemeContext'
import { EdgeText } from '../themed/EdgeText'
import { ThemedScene } from '../themed/ThemedScene2'

const loader = require('../../assets/safeLoader.gif')

interface Props {
  title: string
  message: string
}

const WaitSceneComponent = ({ title, message, theme }: Props & ThemeProps) => {
  const styles = getStyles(theme)

  return (
    <ThemedScene>
      <View style={styles.content}>
        <EdgeText style={styles.title}>{title}</EdgeText>
        <EdgeText style={[styles.message, styles.marginBottom]}>
          {message}
        </EdgeText>
        <Image source={loader} style={styles.loaderImage} />
      </View>
    </ThemedScene>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: theme.fontFaceBold,
    fontSize: theme.rem(1.1),
    marginBottom: theme.rem(1.25)
  },
  message: {
    fontFamily: theme.fontFaceBold,
    fontSize: theme.rem(0.75),
    textAlign: 'center'
  },
  marginBottom: {
    marginBottom: theme.rem(2.5)
  },
  loaderImage: {
    width: theme.rem(5),
    height: theme.rem(5)
  }
}))

export const WaitScene = withTheme(WaitSceneComponent)
