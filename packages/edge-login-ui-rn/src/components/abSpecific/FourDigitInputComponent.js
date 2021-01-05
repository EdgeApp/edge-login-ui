// @flow

import * as React from 'react'
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import { validatePin } from '../../actions/CreateAccountActions.js'
import * as Colors from '../../constants/Colors.js'
import type { Dispatch, RootState } from '../../types/ReduxTypes.js'
import { scale } from '../../util/scaling.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {}
type StateProps = {
  error: string,
  pin: string,
  username: string,
  wait: number
}
type DispatchProps = {
  onChangeText(data: Object): void
}
type Props = OwnProps & StateProps & DispatchProps

class FourDigitInputComponent extends React.Component<Props> {
  inputRef: TextInput | null

  loadedInput = (ref: TextInput | null) => {
    this.inputRef = ref
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.refocus}>
        <View style={styles.container}>
          <View style={styles.interactiveContainer}>
            {this.renderDotContainer()}
            {this.renderTextInput()}
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText} numberOfLines={2}>
              {this.props.error}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderTextInput = () => {
    if (this.props.wait < 1) {
      return (
        <TextInput
          ref={this.loadedInput}
          style={styles.input}
          onChangeText={this.updatePin}
          maxLength={4}
          keyboardType="numeric"
          value={this.props.pin}
          autoFocus
          keyboardShouldPersistTaps
        />
      )
    }
    return null
  }

  refocus = () => {
    if (this.inputRef != null) this.inputRef.focus()
  }

  renderDotContainer() {
    const pinLength = this.props.pin ? this.props.pin.length : 0
    if (this.props.wait > 0) {
      return <ActivityIndicator color={Colors.ACCENT_MINT} size="large" />
    }
    return (
      <View style={styles.dotContainer}>
        <View style={[styles.circle, pinLength > 0 && styles.circleSected]} />
        <View style={[styles.circle, pinLength > 1 && styles.circleSected]} />
        <View style={[styles.circle, pinLength > 2 && styles.circleSected]} />
        <View style={[styles.circle, pinLength > 3 && styles.circleSected]} />
      </View>
    )
  }

  updatePin = (arg: string) => {
    this.props.onChangeText({ username: this.props.username, pin: arg })
  }
}

const styles = {
  // for new account PIN
  container: {
    paddingTop: scale(36),
    width: scale(200),
    height: scale(120)
  },
  interactiveContainer: {
    height: scale(40),
    width: '100%',
    alignItems: 'center'
  },
  errorContainer: {
    width: '100%',
    height: scale(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
  dotContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  errorText: {
    width: '100%',
    textAlign: 'center',
    color: Colors.ACCENT_RED,
    fontSize: scale(14),
    paddingTop: scale(15)
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0
  },
  circle: {
    borderWidth: scale(2),
    borderColor: Colors.PRIMARY,
    borderRadius: scale(15),
    height: scale(30),
    width: scale(30)
  },
  circleSected: {
    backgroundColor: Colors.SECONDARY,
    borderWidth: scale(2),
    borderColor: Colors.PRIMARY,
    borderRadius: scale(15),
    height: scale(30),
    width: scale(30)
  }
}

export const FourDigitInput = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    error: state.create.pinErrorMessage || '',
    pin: state.create.pin,
    username: state.login.username,
    wait: 0
  }),
  (dispatch: Dispatch) => ({
    onChangeText(data: Object) {
      dispatch(validatePin(data))
    }
  })
)(FourDigitInputComponent)
