// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { sprintf } from 'sprintf-js'

import s from '../../common/locales/strings.js'
import * as Colors from '../../constants/Colors.js'
import * as Constants from '../../constants/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { scale } from '../../util/scaling.js'
import { Spinner } from '../common/Spinner.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {}
type StateProps = {
  pin: string,
  autoLogIn: boolean,
  error: string | null,
  wait: number,
  isLogginginWithPin: boolean
}
type Props = OwnProps & StateProps

type State = {
  autoFocus: boolean,
  isFocused: boolean,
  touchId: boolean,
  circleColor: string
}

class FourDigitComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      autoFocus: false,
      isFocused: false,
      touchId: false,
      circleColor: Constants.WHITE
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isLogginginWithPin) {
      this.setState({
        touchId: true
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.interactiveContainer}>
          {this.renderDotContainer()}
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText} numberOfLines={2}>
            {this.props.error}
          </Text>
        </View>
      </View>
    )
  }

  renderDotContainer() {
    const pinLength = this.props.pin ? this.props.pin.length : 0
    if (this.props.wait > 0) {
      return <Spinner />
    }
    if ((pinLength === 4 || this.state.touchId) && this.props.autoLogIn) {
      return <Spinner />
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
}

const styles = {
  // used for logging *back in* with PIN
  container: {
    paddingTop: 12,
    width: '100%',
    height: scale(86)
  },
  errorContainer: {
    height: scale(40),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  errorText: {
    color: Colors.ACCENT_RED,
    backgroundColor: Colors.TRANSPARENT,
    textAlign: 'center',
    fontSize: scale(12)
  },
  interactiveContainer: {
    height: scale(40),
    width: '100%',
    alignItems: 'center'
  },
  dotContainer: {
    height: '100%',
    width: scale(190),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  circle: {
    borderWidth: 2,
    borderColor: Colors.WHITE,
    borderRadius: scale(15),
    height: scale(30),
    width: scale(30)
  },
  circleSected: {
    backgroundColor: Colors.ACCENT_MINT,
    borderWidth: scale(2),
    borderColor: Colors.WHITE,
    borderRadius: scale(15),
    height: scale(30),
    width: scale(30)
  }
}

export const FourDigit = connect<StateProps, {}, OwnProps>(
  (state: RootState) => ({
    pin: state.login.pin || '',
    error:
      state.login.wait && state.login.wait > 0
        ? `${state.login.errorMessage || ''}: ` +
          sprintf(s.strings.account_locked_for, state.login.wait)
        : state.login.errorMessage,
    autoLogIn: true,
    isLogginginWithPin: state.login.isLoggingInWithPin,
    wait: state.login.wait
  }),
  (dispatch: Dispatch) => ({})
)(FourDigitComponent)
