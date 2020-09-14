// @flow

import React, { Component } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { userLoginWithPin } from '../../actions/LoginAction.js'
import s from '../../common/locales/strings.js'
import * as Constants from '../../constants/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { isIphoneX } from '../../util/isIphoneX.js'
import { scale } from '../../util/scaling.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {}
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
    const { wait } = this.props
    const style = PinKeypadStyle

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

const PinKeypadStyle = {
  keypadContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  keypadInner: {
    flex: 1,
    maxWidth: 500,
    height: scale(180),
    maxHeight: 300,
    marginBottom: isIphoneX ? scale(28) : 0
  },
  keypadRow: {
    flex: 1,
    flexDirection: 'row'
  },
  keypadColumn: {
    flex: 1,
    borderColor: Constants.ACCENT_MINT,
    borderWidth: 1,
    margin: scale(2),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  keypadColumnBack: {
    flex: 1,
    margin: scale(2),
    justifyContent: 'center',
    alignItems: 'center'
  },
  keypadColumnBlank: {
    flex: 1,
    margin: scale(2)
  },
  keypadKeys: {
    textAlign: 'center',
    fontSize: scale(14),
    color: Constants.ACCENT_MINT
  },
  keypadKeysBack: {
    textAlign: 'center',
    fontSize: scale(30),
    color: Constants.ACCENT_MINT
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
