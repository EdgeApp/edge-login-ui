// @flow

import * as React from 'react'
import { ActivityIndicator, View } from 'react-native'

import * as Colors from '../../constants/Colors.js'
import * as Styles from '../../styles/index.js'
import { type Branding } from '../../types/Branding.js'
import { BackgroundImage } from '../common/BackgroundImage.js'

type Props = {
  branding: Branding
}

export class LoadingScreen extends React.Component<Props> {
  render() {
    return (
      <View style={LandingScreenStyle.container}>
        <BackgroundImage
          branding={this.props.branding}
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
    ...Styles.BackgroundScreenImageStyle,
    alignItems: 'center'
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}
