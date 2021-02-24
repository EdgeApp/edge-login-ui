// @flow

import * as React from 'react'
import { Image, View } from 'react-native'

import { scale } from '../../util/scaling.js'

type Props = {
  src: any // require(image)
}

class ImageHeaderComponent extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Image source={this.props.src} style={styles.image} />
      </View>
    )
  }
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    paddingBottom: scale(24),
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    position: 'relative',
    height: scale(44),
    overflow: 'visible',
    resizeMode: 'contain'
  }
}

export { ImageHeaderComponent }
