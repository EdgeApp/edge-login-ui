// @flow

import * as React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

import s from '../../../common/locales/strings.js'
import * as Colors from '../../../constants/Colors.js'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { scale } from '../../../util/scaling.js'
import { Header } from '../../common/Header.js'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'

type Props = {}

export class NewAccountWaitScreen extends React.Component<Props> {
  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Header />
          <View style={styles.pageContainer}>
            <View style={styles.topPad} />
            <View style={styles.iconContianer}>
              <ActivityIndicator color={Colors.ACCENT_MINT} size="large" />
            </View>
            <View style={styles.headlineConainer}>
              <Text style={styles.headlineText}>{s.strings.good_job}</Text>
            </View>
            <View style={styles.bodyCopyContainer}>
              <Text style={styles.bodyText}>{s.strings.hang_tight}</Text>
              <Text style={styles.bodyText}>{s.strings.secure_account}</Text>
            </View>
            <View style={styles.encriptingContainer}>
              <Text style={styles.bodyText}>{s.strings.encrypting_wallet}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = {
  screen: { ...Styles.ScreenStyle },
  container: {},
  pageContainer: {
    flex: 1,
    width: '100%',
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
