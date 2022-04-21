import * as React from 'react'
import { ActivityIndicator, View } from 'react-native'

import * as Colors from '../../constants/Colors'
import * as Styles from '../../styles/index'
import { Branding } from '../../types/Branding'
import { BackgroundImage } from '../common/BackgroundImage'

interface Props {
  branding: Branding
}

export class LoadingScene extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage
          branding={this.props.branding}
          content={this.renderSpinner()}
        />
      </View>
    )
  }

  renderSpinner = () => {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator color={Colors.ACCENT_MINT} size="large" />
      </View>
    )
  }
}

const styles = {
  container: Styles.SceneStyle,
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
} as const
