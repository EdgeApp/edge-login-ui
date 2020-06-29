// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import s from '../../../common/locales/strings.js'
import { theme } from '../../../common/theme/edgeDark.js'
import {
  type AirshipBridge,
  AirshipModal,
  ContentArea,
  dayText,
  IconCircle
} from './modalParts.js'

type Alert = {
  type: string,
  accountName: string
}

type Props = {
  bridge: AirshipBridge<void>,
  alerts: Alert[],
  selectUser(string): void
}

export class AlertModal extends Component<Props> {
  render() {
    const { bridge, alerts } = this.props
    return (
      <AirshipModal bridge={bridge} onCancel={() => bridge.resolve()}>
        <IconCircle styles={styles.iconCircle}>
          <FontAwesome
            name="exclamation-triangle"
            size={theme.rem(2)}
            color={theme.headerText}
          />
        </IconCircle>
        <ContentArea padding={0}>
          <Text style={[dayText('autoCenter'), styles.header]}>
            {s.strings.alert_modal_header}
          </Text>
          {alerts.map((alert: Alert, i: number) => {
            const rowStyle =
              i < alerts.length - 1 ? styles.rowUnderline : undefined
            const selectUser = () => {
              this.props.selectUser(alert.accountName)
              bridge.resolve()
            }
            if (alert.type === 'reset2fa') {
              return (
                <TouchableWithoutFeedback onPress={selectUser}>
                  <View style={[styles.row, rowStyle]}>
                    <View style={styles.iconContainer}>
                      <FontAwesome
                        name="exclamation-triangle"
                        size={theme.rem(1.5)}
                        color={theme.alertModalWarningIcon}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text
                        style={styles.headerText}
                      >{`${s.strings.alert_modal_2fa_tile}: ${alert.accountName}`}</Text>
                      <Text style={styles.bodyText}>
                        {s.strings.alert_modal_2fa_body}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )
            }
            if (alert.type === 'loginRequest') {
              return (
                <TouchableWithoutFeedback onPress={selectUser}>
                  <View style={[styles.row, rowStyle]}>
                    <View style={styles.iconContainer}>
                      <FontAwesome
                        name="exclamation-triangle"
                        size={theme.rem(1.5)}
                        color={theme.alertModalDangerIcon}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text
                        style={styles.headerText}
                      >{`${s.strings.alert_modal_login_tile}: ${alert.accountName}`}</Text>
                      <Text style={styles.bodyText}>
                        {s.strings.alert_modal_login_body}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )
            }
          })}
        </ContentArea>
        <TouchableWithoutFeedback onPress={() => bridge.resolve()}>
          <View style={styles.downIconContainer}>
            <Entypo
              name="chevron-thin-down"
              size={theme.rem(1.25)}
              color={theme.alertModalCloseIcon}
            />
          </View>
        </TouchableWithoutFeedback>
      </AirshipModal>
    )
  }
}

const { rem } = theme
const styles = StyleSheet.create({
  iconCircle: {
    backgroundColor: theme.alertModalHeaderIcon,
    borderColor: theme.alertModalHeaderIcon
  },
  header: {
    flexGrow: 1,
    marginTop: rem(0.75),
    marginHorizontal: rem(1),
    fontSize: rem(1),
    fontFamily: theme.fontFamily
  },
  row: {
    width: '100%',
    paddingVertical: rem(0.5),
    paddingHorizontal: rem(0.5),
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowUnderline: {
    borderColor: theme.alertModalRowBorder,
    borderBottomWidth: 1
  },
  iconContainer: {
    margin: theme.rem(0.5)
  },
  textContainer: {
    margin: theme.rem(0.5),
    flex: 1
  },
  headerText: {
    fontSize: rem(0.75),
    fontWeight: '500',
    marginVertical: rem(0.25),
    fontFamily: theme.fontFamily
  },
  bodyText: {
    fontSize: rem(0.8),
    fontWeight: '200',
    marginVertical: rem(0.25),
    fontFamily: theme.fontFamily
  },
  downIconContainer: {
    marginBottom: rem(1),
    marginHorizontal: rem(1),
    alignItems: 'center'
  }
})
