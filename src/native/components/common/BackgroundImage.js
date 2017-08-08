import React from 'react'
import { Image } from 'react-native'

const BackgroundImage = ({ style, src, children }) => {
  return (
    <Image
      source={src}
      style={style}
    >
      {children}
    </Image>
  )
}

export { BackgroundImage }
