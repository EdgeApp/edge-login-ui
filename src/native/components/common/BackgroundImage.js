import React from 'react'
import { Image, TouchableWithoutFeedback, Keyboard } from 'react-native'

const BackgroundImage = ({ style, src, children, func }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Image source={src} style={style}>
        {children}
      </Image>
    </TouchableWithoutFeedback>
  )
}

export { BackgroundImage }
