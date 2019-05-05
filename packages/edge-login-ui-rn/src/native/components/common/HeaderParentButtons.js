// @flow

import React, { Component } from 'react'
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'

import s from '../../../common/locales/strings.js'
import * as Assets from '../../assets/'

type Props = {
  appId?: string,
  parentButton?: Object,
  styles: Object
}

class HeaderParentButtons extends Component<Props> {
  render () {
    const { parentButton, styles, appId } = this.props
    const openEdgeSite = () => Linking.openURL(s.strings.edge_site)
    return (
      <View style={styles.container}>
        {parentButton &&
          parentButton.text && (
          <TouchableOpacity onPress={parentButton.callback}>
            <View style={styles.leftButtonContainer}>
              <Text style={parentButton.style || styles.leftButtonText}>
                {parentButton.text}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.spacer} />
        {appId && (
          <TouchableOpacity onPress={openEdgeSite}>
            <View style={styles.rightButtonContainer}>
              <Text style={styles.rightButtonText}>powered by</Text>
              <Image
                source={Assets.LOGO_SMALL}
                resizeMode={'contain'}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

export { HeaderParentButtons }
