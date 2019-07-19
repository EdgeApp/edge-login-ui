// @flow

import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import * as Constants from '../../../common/constants'
import { Icon } from '../common'

export type Props = {
  style: Object,
  pin: string,
  username: string,
  wait: boolean,
  onChangeText(Object): void
}

class PinKeypad extends Component<Props> {
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
  render () {
    const { wait, style } = this.props
    return (
      <View style={style.keypadContainer}>
        <View style={style.keypadRow}>
          <TouchableOpacity
            style={style.keypadColumn}
            onPress={() => this.changePin('1')}
            disabled={wait}
          >
            <Text style={style.keypadKeys}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.keypadColumn}
            onPress={() => this.changePin('2')}
            disabled={wait}
          >
            <Text style={style.keypadKeys}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.keypadColumn}
            onPress={() => this.changePin('3')}
            disabled={wait}
          >
            <Text style={style.keypadKeys}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={style.keypadRow}>
          <TouchableOpacity
            style={style.keypadColumn}
            onPress={() => this.changePin('4')}
            disabled={wait}
          >
            <Text style={style.keypadKeys}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.keypadColumn}
            onPress={() => this.changePin('5')}
            disabled={wait}
          >
            <Text style={style.keypadKeys}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.keypadColumn}
            onPress={() => this.changePin('6')}
            disabled={wait}
          >
            <Text style={style.keypadKeys}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={style.keypadRow}>
          <TouchableOpacity
            style={style.keypadColumn}
            onPress={() => this.changePin('7')}
            disabled={wait}
          >
            <Text style={style.keypadKeys}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.keypadColumn}
            onPress={() => this.changePin('8')}
            disabled={wait}
          >
            <Text style={style.keypadKeys}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.keypadColumn}
            onPress={() => this.changePin('9')}
            disabled={wait}
          >
            <Text style={style.keypadKeys}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={style.keypadRow}>
          <View style={style.keypadColumnBlank} />
          <TouchableOpacity
            style={style.keypadColumn}
            onPress={() => this.changePin('0')}
            disabled={wait}
          >
            <Text style={style.keypadKeys}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.keypadColumnBack}
            onPress={() => this.changePin('back')}
            disabled={wait}
          >
            <Icon
              style={style.keypadKeysBack}
              name={Constants.BACKSPACE}
              type={Constants.MATERIAL_ICONS}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export { PinKeypad }
