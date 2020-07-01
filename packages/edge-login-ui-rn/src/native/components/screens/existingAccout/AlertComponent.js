// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import s from '../../../../common/locales/strings.js'
import { theme } from '../../../../common/theme/edgeDark.js'
import Gradient from '../../common/Gradient.js'
import SafeAreaViewGradient from '../../common/SafeAreaViewGradient.js'
import { ChangePasswordScreen } from '../../exportAPIComponents/ChangePasswordScreen.js'

const GRADIENT = [theme.background1, theme.background2]

type Props = {
  data: Object
}

type State = {
  isDenied: boolean
}

export class AlertComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isDenied: false
    }
  }

  onDeny = () => this.setState({ isDenied: true })

  afterDenied = () => {
    const { abcAccount, touchIdInformation, callback } = this.props.data
    // Put alert deny logic here
    callback(null, abcAccount, touchIdInformation)
  }

  onAgree = () => {
    const { abcAccount, touchIdInformation, callback } = this.props.data
    // Put alert agree logic here
    callback(null, abcAccount, touchIdInformation)
  }

  renderAlert = () => {
    const { alert } = this.props.data
    return (
      <SafeAreaViewGradient colors={GRADIENT}>
        <Gradient style={styles.container} colors={GRADIENT}>
          <View style={styles.iconContainer}>
            <FontAwesome
              name="exclamation-triangle"
              size={theme.rem(2)}
              color={theme.alertPageWarningIcon}
            />
          </View>
          <Text style={styles.header}>{s.strings.alert_page_header}</Text>
          <Text style={styles.body1}>{s.strings.alert_page_body_1}</Text>
          <Text
            style={styles.deviceText}
          >{`${s.strings.alert_page_device}: ${alert.device}`}</Text>
          <Text
            style={styles.lastLocationText}
          >{`${s.strings.alert_page_last_location}:\n${alert.lastLocation}\n${alert.lastDate}`}</Text>
          <Text style={styles.body2}>{s.strings.alert_page_body_2}</Text>
          <Text
            style={styles.body3}
          >{`${s.strings.alert_page_body_3}:\n${alert.disbaledDate}`}</Text>
          <TouchableWithoutFeedback onPress={this.onDeny}>
            <View style={styles.denyButtonContainer}>
              <View style={styles.denyButton}>
                <Text style={styles.denyText}>{s.strings.alert_page_deny}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onAgree}>
            <View style={styles.agreeContainer}>
              <Text style={styles.agreeText}>{s.strings.alert_page_agree}</Text>
            </View>
          </TouchableWithoutFeedback>
        </Gradient>
      </SafeAreaViewGradient>
    )
  }

  render() {
    const { isDenied } = this.state
    if (isDenied) {
      return (
        <ChangePasswordScreen
          account={this.props.data.abcAccount}
          context={this.props.data.context}
          showHeader={false}
          onComplete={this.afterDenied}
          onCancel={this.afterDenied}
        />
      )
    }
    return this.renderAlert()
  }
}

const { rem } = theme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: rem(1.5),
    justifyContent: 'center'
  },
  iconContainer: {
    width: '100%',
    marginBottom: rem(0.5),
    alignItems: 'center'
  },
  header: {
    fontFamily: theme.fontFamily,
    fontSize: rem(1.5),
    color: theme.headerText,
    marginTop: rem(0.25),
    marginBottom: rem(0.5),
    textAlign: 'center'
  },
  body1: {
    fontFamily: theme.fontFamily,
    fontSize: rem(1),
    marginTop: rem(0.25),
    marginBottom: rem(0.5),
    color: theme.primaryText
  },
  deviceText: {
    fontFamily: theme.fontFamily,
    fontSize: rem(0.75),
    marginVertical: rem(0.25),
    color: theme.primaryText
  },
  lastLocationText: {
    fontFamily: theme.fontFamily,
    fontSize: rem(0.75),
    marginVertical: rem(0.25),
    color: theme.primaryText
  },
  body2: {
    fontFamily: theme.fontFamily,
    fontSize: rem(1),
    color: theme.dangerText,
    marginTop: rem(0.5),
    marginBottom: rem(0.25)
  },
  body3: {
    fontFamily: theme.fontFamily,
    fontSize: rem(1),
    color: theme.dangerText,
    marginVertical: rem(0.5)
  },
  denyButtonContainer: {
    width: '100%',
    marginTop: rem(1.5),
    paddingHorizontal: rem(1)
  },
  denyButton: {
    width: '100%',
    height: rem(3),
    borderRadius: rem(1.5),
    backgroundColor: theme.alertPageDenyButtonBackground,
    justifyContent: 'center',
    alignItems: 'center'
  },
  denyText: {
    fontFamily: theme.fontFamily,
    fontSize: rem(1),
    color: theme.alertPageDenyButtonText
  },
  agreeContainer: {
    width: '100%',
    height: rem(3),
    justifyContent: 'center',
    alignItems: 'center'
  },
  agreeText: {
    fontFamily: theme.fontFamily,
    fontSize: rem(1),
    color: theme.dangerText
  }
})
