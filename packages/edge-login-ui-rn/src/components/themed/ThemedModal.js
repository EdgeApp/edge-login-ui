// @flow

import * as React from 'react'
import { type ViewStyle, StyleSheet } from 'react-native'
import { type AirshipBridge, AirshipModal } from 'react-native-airship'

import { packEdges, unpackEdges } from '../../util/edges.js'
import { useTheme } from '../services/ThemeContext.js'

type Props = {
  bridge: AirshipBridge<any>,
  children?: React.Node,
  onCancel: () => void,

  // Control over the content area:
  flexDirection?: $PropertyType<ViewStyle, 'flexDirection'>,
  justifyContent?: $PropertyType<ViewStyle, 'justifyContent'>,
  paddingRem?: number[] | number
}

export function ThemedModal(props: Props) {
  const { bridge, children = null, onCancel } = props
  const paddingRem = unpackEdges(props.paddingRem ?? 1)
  const theme = useTheme()

  // Since we can't add native dependencies without a major version bump,
  // we rely on the GUI to sneak this one to us:
  const { ReactNativeBlurView } = global
  const underlay =
    typeof ReactNativeBlurView === 'function' ? (
      <ReactNativeBlurView
        blurType={theme.modalBlurType}
        style={StyleSheet.absoluteFill}
      />
    ) : (
      'rgba(0, 0, 0, 0.75)'
    )

  return (
    <AirshipModal
      bridge={bridge}
      onCancel={onCancel}
      backgroundColor={theme.modal}
      borderRadius={theme.rem(1)}
      padding={packEdges(paddingRem).map(theme.rem)}
      underlay={underlay}
    >
      {children}
    </AirshipModal>
  )
}
