// @flow

import * as React from 'react'
import {
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { type Branding } from '../../types/Branding.js'
import { useTheme } from '../services/ThemeContext.js'

type Props = {
  branding: Branding,
  style: Object,
  content: any,
  enableTouch?: boolean,
  callback?: Function | null
}

export const BackgroundImage = ({
  branding,
  style,
  content,
  enableTouch = true,
  callback
}: Props) => {
  const src = branding.backgroundImage
  const theme = useTheme()

  const imageBackground = () => {
    return (
      <ImageBackground source={src} style={style}>
        {content}
      </ImageBackground>
    )
  }

  const gradientBackground = () => {
    return (
      <LinearGradient
        style={style}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[theme.backgroundGradientLeft, theme.backgroundGradientRight]}
      >
        {content}
      </LinearGradient>
    )
  }

  const componentBackground = src ? imageBackground() : gradientBackground()

  const onPress = () => {
    if (callback) {
      return () => {
        callback()
        Keyboard.dismiss()
      }
    }
    return Keyboard.dismiss()
  }

  if (enableTouch) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        {componentBackground}
      </TouchableWithoutFeedback>
    )
  }

  return componentBackground
}
