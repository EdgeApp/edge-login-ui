// @flow

import React, { Component } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { userLoginWithPin } from '../../actions/LoginAction.js'
import s from '../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  style: Object
}
type StateProps = {
  pin: string,
  username: string,
  wait: boolean
}
type DispatchProps = {
  onChangeText(Object): void
}
type Props = OwnProps & StateProps & DispatchProps

class PinKeypadComponent extends Component<Props> {
  changePin = (value: string) => {
    const { username, pin, onChangeText } = this.props
    if (value === 'back') {
      return onChangeText({
        username: username,
        pin: pin && pin !== '' ? pin.substr(0, pin.length - 1) : ''
      })
    }
    onChangeText({ username: username, pin: pin ? pin.concat(value) : value })
  }

  render() {
    const { wait, style } = this.props
    return (
      <View style={style.keypadContainer}>
        <View style={style.keypadInner}>
          <View style={style.keypadRow}>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() => this.changePin('1')}
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>{s.strings.keypad_one}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() => this.changePin('2')}
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>{s.strings.keypad_two}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() => this.changePin('3')}
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>{s.strings.keypad_three}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={style.keypadRow}>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() => this.changePin('4')}
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>{s.strings.keypad_four}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() => this.changePin('5')}
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>{s.strings.keypad_five}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() => this.changePin('6')}
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>{s.strings.keypad_six}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={style.keypadRow}>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() => this.changePin('7')}
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>{s.strings.keypad_seven}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() => this.changePin('8')}
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>{s.strings.keypad_eight}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() => this.changePin('9')}
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>{s.strings.keypad_nine}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={style.keypadRow}>
            <View style={style.keypadColumnBlank} />
            <TouchableWithoutFeedback
              style={style.keypadColumn}
              onPress={() => this.changePin('0')}
              disabled={wait}
            >
              <View style={style.keypadColumn}>
                <Text style={style.keypadKeys}>{s.strings.keypad_zero}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.changePin('back')}
              disabled={wait}
            >
              <View style={style.keypadColumnBack}>
                <MaterialIcon name="backspace" style={style.keypadKeysBack} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    )
  }
}

export const PinKeypad = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => {
    const pinLength = state.login.pin ? state.login.pin.length : 0
    return {
      pin: state.login.pin || '',
      username: state.login.username,
      wait: state.login.wait > 0 || pinLength === 4
    }
  },
  (dispatch: Dispatch) => ({
    onChangeText: (data: Object) => dispatch(userLoginWithPin(data))
  })
)(PinKeypadComponent)
