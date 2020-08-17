// @flow

import { makeReactNativeFolder } from 'disklet'
import { type EdgeAccount, type EdgeContext } from 'edge-core-js'
import React, { Component } from 'react'
import { View } from 'react-native'

import { initializeChangeRecovery } from '../../actions/PasswordRecoveryActions.js'
import * as Styles from '../../styles/index.js'
import { PublicChangeRecoveryScreen } from '../screens/existingAccout/ChangeRecoveryScreen.js'
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

export class PasswordRecoveryScreen extends Component<Props> {
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
        initialAction={initializeChangeRecovery()}
      >
        <ThemeProvider>
          <Airship avoidAndroidKeyboard statusBarTranslucent>
            <View style={Styles.ScreenStyle} accessible>
              <PublicChangeRecoveryScreen showHeader={this.props.showHeader} />
            </View>
          </Airship>
        </ThemeProvider>
      </ReduxStore>
    )
  }
}
