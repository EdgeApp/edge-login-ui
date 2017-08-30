import React from 'react'
import { ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native'

const BackgroundImage = ({ style, src, content, enableTouch = true }) => {
  if (enableTouch) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
