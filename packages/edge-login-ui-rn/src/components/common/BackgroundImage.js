// @flow

import * as React from 'react'
import {
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'

import { LOGIN_BACKGROUND } from '../../assets/index.js'
import { type Branding } from '../../types/Branding.js'

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
  const src = branding.backgroundImage || LOGIN_BACKGROUND

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
        <ImageBackground source={src} style={style}>
          {content}
        </ImageBackground>
      </TouchableWithoutFeedback>
    )
  }
  return (
    <ImageBackground source={src} style={style}>
      {content}
    </ImageBackground>
  )
}
