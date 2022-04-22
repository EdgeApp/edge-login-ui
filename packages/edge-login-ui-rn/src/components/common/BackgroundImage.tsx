import * as React from 'react'
import {
  FlexStyle,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { Branding } from '../../types/Branding'
import { useTheme } from '../services/ThemeContext'

interface Props {
  branding: Branding
  content: any
  enableTouch?: boolean
  onPress?: () => void
}
const start = { x: 0, y: 0 }
const end = { x: 1, y: 0 }

export const BackgroundImage = ({
  branding,
  content,
  enableTouch = true,
  onPress = () => Keyboard.dismiss()
}: Props) => {
  const src = branding.backgroundImage
  const theme = useTheme()

  const imageBackground = () => {
    return (
      <ImageBackground source={src} style={styles.backgroundImage}>
        {content}
      </ImageBackground>
    )
  }

  const gradientBackground = () => {
    return (
      <LinearGradient
        style={styles.backgroundImage}
        start={start}
        end={end}
        colors={theme.backgroundGradientColors}
      >
        {content}
      </LinearGradient>
    )
  }

  const componentBackground = src ? imageBackground() : gradientBackground()

  if (enableTouch) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        {componentBackground}
      </TouchableWithoutFeedback>
    )
  }

  return componentBackground
}

const styles: { backgroundImage: FlexStyle } = {
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center'
  }
}
