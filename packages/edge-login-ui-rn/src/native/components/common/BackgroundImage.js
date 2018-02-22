// @flow
import React from 'react'
import {
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'

type Props = {
  style: Object,
  src: string,
  content: any,
  enableTouch: boolean,
  callback?: Function
}
const BackgroundImage = ({
  style,
  src,
  content,
  enableTouch = true,
  callback
}: Props) => {
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

export { BackgroundImage }
