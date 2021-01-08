// @flow

import * as React from 'react'
import { Image, TouchableWithoutFeedback, View } from 'react-native'

import * as Assets from '../../assets/'
import { scale } from '../../util/scaling.js'

type Props = {
  small?: boolean,
  src?: string,
  callback?: () => void
}

type State = {
  taps: number
}

class LogoImageHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      taps: 0
    }
  }

  _onPress = () => {
    const { callback } = this.props
    if (callback != null) {
      const taps = this.state.taps + 1
      this.setState({ taps })
      if (taps > 4) {
        callback()
        this.setState({ taps: 0 })
      }
      if (taps === 1) {
        setTimeout(() => this.setState({ taps: 0 }), 2000)
      }
    }
  }

  render() {
    let src = this.props.src || Assets.LOGO_BIG
    if (this.props.small) {
      src = Assets.LOGO_SMALL
    }
    return (
      <TouchableWithoutFeedback onPress={this._onPress}>
        <View style={styles.container}>
          <Image source={src} style={styles.image} resizeMode="contain" />
        </View>
      </TouchableWithoutFeedback>
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

export { LogoImageHeader }
