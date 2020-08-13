// @flow

import { makeReactNativeFolder } from 'disklet'
import { type EdgeAccount, type EdgeContext } from 'edge-core-js'
import React, { Component } from 'react'

import { ChangePinApp } from '../navigation/ChangePinAppComponent.js'
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

export class ChangePinScreen extends Component<Props> {
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
      >
        <ThemeProvider>
          <Airship avoidAndroidKeyboard statusBarTranslucent>
            <ChangePinApp showHeader={this.props.showHeader} />
          </Airship>
        </ThemeProvider>
      </ReduxStore>
    )
  }
}
