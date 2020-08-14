// @flow

import { makeReactNativeFolder } from 'disklet'
import { type EdgeAccount, type EdgeContext } from 'edge-core-js'
import React, { Component } from 'react'
import { View } from 'react-native'

import * as Styles from '../../styles/index.js'
import { PublicChangePasswordScreen } from '../screens/existingAccout/ChangePasswordScreen.js'
import { Airship } from '../services/AirshipInstance.js'
import { ReduxStore } from '../services/ReduxStore.js'
import { ThemeProvider } from '../services/ThemeContext.js'

type Props = {
  account: EdgeAccount,
  context: EdgeContext,
  showHeader: boolean,
  onComplete(): void,
  onCancel(): void
}

export class ChangePasswordScreen extends Component<Props> {
  static defaultProps = {
    showHeader: true
  }

  render() {
    return (
      <ReduxStore
        imports={{
          accountObject: this.props.account,
          accountOptions: {},
          callback: () => {},
          context: this.props.context,
          folder: makeReactNativeFolder(),
          onCancel: this.props.onComplete,
          onComplete: this.props.onComplete
        }}
        initialAction={{ type: 'WORKFLOW_START', data: 'changePasswordWF' }}
      >
        <ThemeProvider>
          <Airship avoidAndroidKeyboard statusBarTranslucent>
            <View style={Styles.ScreenStyle} accessible>
              <PublicChangePasswordScreen showHeader={this.props.showHeader} />
            </View>
          </Airship>
        </ThemeProvider>
      </ReduxStore>
    )
  }
}
