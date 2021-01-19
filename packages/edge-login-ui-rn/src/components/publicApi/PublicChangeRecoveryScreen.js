// @flow

import { makeReactNativeFolder } from 'disklet'
import { type EdgeAccount, type EdgeContext } from 'edge-core-js'
import * as React from 'react'
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
  onComplete(): void
}

export class PasswordRecoveryScreen extends React.Component<Props> {
  render() {
    return (
      <ReduxStore
        imports={{
          accountOptions: {},
          callback: () => {},
          context: this.props.context,
          folder: makeReactNativeFolder(),
          onComplete: this.props.onComplete
        }}
        initialAction={initializeChangeRecovery(this.props.account)}
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
