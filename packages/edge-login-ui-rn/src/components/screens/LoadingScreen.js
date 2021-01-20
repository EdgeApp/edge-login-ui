// @flow

import * as React from 'react'
import { ActivityIndicator, View } from 'react-native'

import * as Assets from '../../assets/index.js'
import * as Colors from '../../constants/Colors.js'
import * as Styles from '../../styles/index.js'
import { BackgroundImage } from '../common/BackgroundImage.js'

type Props = {
  backgroundImage?: any
}

export class LoadingScreen extends React.Component<Props> {
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
    return (
      <View style={LandingScreenStyle.spinner}>
        <ActivityIndicator color={Colors.ACCENT_MINT} size="large" />
      </View>
    )
  }
}

const LandingScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center'
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}
