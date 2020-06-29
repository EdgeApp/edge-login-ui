// @flow

import { Gradient } from 'edge-components'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import { theme } from '../../../../common/theme/edgeDark.js'

type Props = {
  data: Object
}

export class AlertComponent extends Component<Props> {
  render() {
    return (
      <Gradient
        style={styles.container}
        colors={[theme.background1, theme.background2]}
        reverse
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
})
