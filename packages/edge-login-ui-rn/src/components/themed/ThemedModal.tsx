import * as React from 'react'
import { StyleSheet } from 'react-native'
import { AirshipBridge, AirshipModal } from 'react-native-airship'

import { fixSides } from '../../util/sides'
import { useTheme } from '../services/ThemeContext'

interface Props<T> {
  bridge: AirshipBridge<T>
  children?: React.ReactNode
  onCancel: () => void

  // Control over the content area:
  paddingRem?: number[] | number
  borderColor?: string
  borderWidth?: number
}

export function ThemedModal<T>(props: Props<T>) {
  const { bridge, children = null, onCancel, paddingRem } = props
  const theme = useTheme()

  // Since we can't add native dependencies without a major version bump,
  // we rely on the GUI to sneak this one to us:
  // @ts-expect-error
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

  const borderColor = props.borderColor ?? theme.modalBorderColor
  const borderWidth = props.borderWidth ?? theme.modalBorderWidth

  return (
    <AirshipModal
      bridge={bridge}
      onCancel={onCancel}
      backgroundColor={theme.modal}
      borderRadius={theme.rem(theme.modalBorderRadiusRem)}
      borderColor={borderColor}
      borderWidth={borderWidth}
      padding={fixSides(paddingRem, 1).map(theme.rem)}
      underlay={underlay}
    >
      {children}
    </AirshipModal>
  )
}
