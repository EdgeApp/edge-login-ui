import React from 'react'
import { Image, TouchableWithoutFeedback, Keyboard } from 'react-native'

const BackgroundImage = ({ style, src, content, enableTouch = true }) => {
  if (enableTouch) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Image source={src} style={style}>
          {content}
        </Image>
      </TouchableWithoutFeedback>
    )
  }
  return (
    <Image source={src} style={style}>
      {content}
    </Image>
  )
}

export { BackgroundImage }
