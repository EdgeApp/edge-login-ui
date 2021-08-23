import * as React from 'react'
import { ActivityIndicator, Image, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import * as Colors from '../../constants/Colors'
import { Theme, ThemeProps, withTheme } from '../services/ThemeContext'
import { EdgeText } from '../themed/EdgeText'
import { ThemedScene } from '../themed/ThemedScene'

interface Props {
  title: string
  message: string
  loader?: React.ReactNode
}

interface ImageLoaderProps {
  source: any
}

const WaitScreenComponent = ({
  title,
  loader,
  message,
  theme
}: Props & ThemeProps) => {
  const styles = getStyles(theme)

  return (
    <ThemedScene>
      <View style={styles.content}>
        <EdgeText style={styles.title}>{title}</EdgeText>
        <EdgeText style={[styles.message, styles.marginBottom]}>
          {message}
        </EdgeText>
        {loader != null ? (
          loader
        ) : (
          <ActivityIndicator color={Colors.ACCENT_MINT} size="large" />
        )}
      </View>
    </ThemedScene>
  )
}

const ImageLoaderComponent = ({
  source,
  theme
}: ImageLoaderProps & ThemeProps) => {
  const styles = getStyles(theme)
  return <Image source={source} style={styles.loaderImage} />
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

export const WaitScreen = withTheme(WaitScreenComponent)
export const ImageLoader = withTheme(ImageLoaderComponent)
