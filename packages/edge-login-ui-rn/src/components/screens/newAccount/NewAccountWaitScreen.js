// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import s from '../../../common/locales/strings.js'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnector.js'
import * as Colors from '../../../constants/Colors.js'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { scale } from '../../../util/scaling.js'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'
import { Spinner } from '../../common/Spinner.js'

type Props = {}

export class NewAccountWaitScreen extends Component<Props> {
  render() {
    return (
      <SafeAreaView>
        <View style={CreatingAccountWaitScreenStyle.container}>
          <HeaderConnector />
          <View style={CreatingAccountWaitScreenStyle.pageContainer}>
            <View style={CreatingAccountWaitScreenStyle.topPad} />
            <View style={CreatingAccountWaitScreenStyle.iconContianer}>
              <Spinner />
            </View>
            <View style={CreatingAccountWaitScreenStyle.headlineConainer}>
              <Text style={CreatingAccountWaitScreenStyle.headlineText}>
                {s.strings.good_job}
              </Text>
            </View>
            <View style={CreatingAccountWaitScreenStyle.bodyCopyContainer}>
              <Text style={CreatingAccountWaitScreenStyle.bodyText}>
                {s.strings.hang_tight}
              </Text>
              <Text style={CreatingAccountWaitScreenStyle.bodyText}>
                {s.strings.secure_account}
              </Text>
            </View>
            <View style={CreatingAccountWaitScreenStyle.encriptingContainer}>
              <Text style={CreatingAccountWaitScreenStyle.bodyText}>
                {s.strings.encrypting_wallet}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const CreatingAccountWaitScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  container: {},
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center'
  },
  topPad: {
    width: '100%',
    height: scale(35)
  },
  iconContianer: {
    width: '100%',
    height: scale(80),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  headlineConainer: {
    width: '100%',
    height: scale(55),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  bodyCopyContainer: {
    width: '100%',
    height: scale(35),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  encriptingContainer: {
    width: '100%',
    height: scale(50),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  headlineText: {
    fontSize: scale(Styles.CreateAccountFont.headerFontSize),
    fontFamily: Constants.FONTS.fontFamilyRegular
  },
  bodyText: {
    fontSize: scale(Styles.CreateAccountFont.defaultFontSize),
    fontFamily: Constants.FONTS.fontFamilyRegular,
    color: Colors.GRAY_2
  }
}
