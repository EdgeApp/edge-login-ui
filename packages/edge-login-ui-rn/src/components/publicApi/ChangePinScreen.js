// @flow

import { makeReactNativeFolder } from 'disklet'
import { type EdgeAccount, type EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { View } from 'react-native'

import * as Styles from '../../styles/index.js'
import { PublicChangePinScreen } from '../screens/existingAccout/ChangePinScreen.js'
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

export class ChangePinScreen extends React.Component<Props> {
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
        initialAction={{ type: 'WORKFLOW_START', data: 'changePinWF' }}
      >
        <ThemeProvider>
          <Airship avoidAndroidKeyboard statusBarTranslucent>
            <View accessible style={Styles.ScreenStyle}>
              <PublicChangePinScreen showHeader={this.props.showHeader} />
            </View>
          </Airship>
        </ThemeProvider>
      </ReduxStore>
    )
  }
}
