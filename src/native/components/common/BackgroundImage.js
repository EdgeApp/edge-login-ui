import React from 'react'
import { Image } from 'react-native'

const BackgroundImage = ({ style, src, children }) => {
  return (
    <Image
      source={require('../../assets/login_bg.png')}
      style={style}
    >
      {children}
    </Image>
  )
}

export { BackgroundImage }
