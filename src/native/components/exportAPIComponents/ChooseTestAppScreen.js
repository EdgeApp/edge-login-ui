import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { Button } from '../common/Button'
import * as Styles from '../../styles'

class ChooseTestAppScreen extends Component {
  componentWillReceiveProps (props) {}
  onPasswordPress () {
    this.props.onChangePassword()
  }
  onPinPress () {
    this.props.onChangePin()
  }
  onRecoverPress () {
  }
  render () {
    // const { ScreenStyle } = this.props.styles
    return (
      <View
        style={{
          ...Styles.ScreenStyle,
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        <Button
          label='Change Password'
          onPress={this.onPasswordPress.bind(this)}
          downStyle={Styles.PrimaryButtonDownStyle}
          upStyle={Styles.PrimaryButtonUpStyle}
          downTextStyle={Styles.PrimaryButtonUpTextStyle}
          upTextStyle={Styles.PrimaryButtonUpTextStyle}
        />
        <Button
          label='Change PIN'
          onPress={this.onPinPress.bind(this)}
          downStyle={Styles.PrimaryButtonDownStyle}
          upStyle={Styles.PrimaryButtonUpStyle}
          downTextStyle={Styles.PrimaryButtonUpTextStyle}
          upTextStyle={Styles.PrimaryButtonUpTextStyle}
        />
        <Button
          label='Password Recovery'
          onPress={this.onRecoverPress.bind(this)}
          downStyle={Styles.PrimaryButtonDownStyle}
          upStyle={Styles.PrimaryButtonUpStyle}
          downTextStyle={Styles.PrimaryButtonUpTextStyle}
          upTextStyle={Styles.PrimaryButtonUpTextStyle}
        />
      </View>
    )
  }
}

ChooseTestAppScreen.propTypes = {
  onChangePassword: PropTypes.func,
  onChangePin: PropTypes.func,
  onRecoverPassword: PropTypes.func
}

export { ChooseTestAppScreen }
