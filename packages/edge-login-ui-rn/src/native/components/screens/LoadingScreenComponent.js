// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import * as Assets from '../../assets/'
import * as Styles from '../../styles/index.js'
import { BackgroundImage, Spinner } from '../common'

type Props = {
  backgroundImage?: any
}

export class LoadingScreen extends Component<Props> {
  render() {
    return (
      <View style={LandingScreenStyle.container}>
        <BackgroundImage
          src={this.props.backgroundImage || Assets.LOGIN_BACKGROUND}
          style={LandingScreenStyle.backgroundImage}
          content={this.renderSpinner()}
        />
      </View>
    )
  }

  renderSpinner = () => {
    const { CenteredSpinnerStyle } = Styles
    return <Spinner style={CenteredSpinnerStyle} />
  }
}

const LandingScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {
    ...Styles.BackgroundScreenImageStyle,
    alignItems: 'center'
  }
}
