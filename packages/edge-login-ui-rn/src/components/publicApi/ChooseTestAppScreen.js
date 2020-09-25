// @flow

import * as React from 'react'
import { View } from 'react-native'

import * as Styles from '../../styles/index.js'
import { Button } from '../common/Button.js'
import { Airship } from '../services/AirshipInstance.js'
import { ThemeProvider } from '../services/ThemeContext.js'

type Props = {
  onChangePassword(): void,
  onChangePin(): void,
  onRecoverPassword(): void
}

export class ChooseTestAppScreen extends React.Component<Props> {
  onPasswordPress() {
    this.props.onChangePassword()
  }

  onPinPress() {
    this.props.onChangePin()
  }

  onRecoverPress() {}
  render() {
    // const { ScreenStyle } = this.props.styles
    return (
      <ThemeProvider>
        <Airship avoidAndroidKeyboard statusBarTranslucent>
          <View
            style={{
              ...Styles.ScreenStyle,
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            <Button
              label="Change Password"
              onPress={this.onPasswordPress.bind(this)}
              downStyle={Styles.PrimaryButtonDownStyle}
              upStyle={Styles.PrimaryButtonUpStyle}
              downTextStyle={Styles.PrimaryButtonUpTextStyle}
              upTextStyle={Styles.PrimaryButtonUpTextStyle}
            />
            <Button
              label="Change PIN"
              onPress={this.onPinPress.bind(this)}
              downStyle={Styles.PrimaryButtonDownStyle}
              upStyle={Styles.PrimaryButtonUpStyle}
              downTextStyle={Styles.PrimaryButtonUpTextStyle}
              upTextStyle={Styles.PrimaryButtonUpTextStyle}
            />
            <Button
              label="Password Recovery"
              onPress={this.onRecoverPress.bind(this)}
              downStyle={Styles.PrimaryButtonDownStyle}
              upStyle={Styles.PrimaryButtonUpStyle}
              downTextStyle={Styles.PrimaryButtonUpTextStyle}
              upTextStyle={Styles.PrimaryButtonUpTextStyle}
            />
          </View>
        </Airship>
      </ThemeProvider>
    )
  }
}
