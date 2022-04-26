import * as React from 'react'
import { AirshipBridge } from 'react-native-airship'

import { showError } from '../services/AirshipInstance'
import { MainButton } from '../themed/MainButton'
import { ModalCloseArrow } from '../themed/ModalParts'
import { ThemedModal } from '../themed/ThemedModal'
import { MessageText, TitleText } from '../themed/ThemedText'

export interface ButtonInfo {
  label: string
  type?: 'primary' | 'secondary' | 'escape'

  // The modal will show a spinner as long as this promise is pending.
  // Returning true will dismiss the modal,
  // but returning false will leave the modal up.
  // Although multiple buttons can be spinning at once,
  // a spinning button cannot be clicked again until the promise resolves.
  onPress?: () => Promise<boolean>
}

/**
 * A modal with a title, message, and buttons.
 * This is an alternative to the native `Alert` component.
 *
 * Child components appear between the message and the buttons,
 * but this feature is only meant for inserting extra message elements,
 * like images or custom text formatting.
 *
 * Build a custom modal component if you need form fields, check boxes,
 * or other interactive elements.
 */
export function ButtonsModal<
  Buttons extends { [key: string]: ButtonInfo }
>(props: {
  bridge: AirshipBridge<keyof Buttons | undefined>
  buttons: Buttons
  children?: React.ReactNode
  closeArrow?: boolean
  message?: string
  title?: string
  borderColor?: string
  borderWidth?: number
}) {
  const {
    bridge,
    buttons,
    children,
    closeArrow = false,
    message,
    title
  } = props
  const handleCancel = () => bridge.resolve(undefined)

  return (
    <ThemedModal
      bridge={bridge}
      borderColor={props.borderColor}
      borderWidth={props.borderWidth}
      paddingRem={1}
      onCancel={handleCancel}
    >
      {title != null ? <TitleText>{title}</TitleText> : null}
      {message != null ? <MessageText>{message}</MessageText> : null}
      {children}
      {Object.keys(buttons).map(key => {
        const { type = 'primary', label, onPress } = buttons[key]

        const handlePress = (): void | Promise<void> => {
          if (onPress == null) return bridge.resolve(key)
          return onPress().then(
            result => {
              if (result) bridge.resolve(key)
            },
            error => showError(error)
          )
        }

        return (
          <MainButton
            key={key}
            label={label}
            marginRem={0.5}
            type={type}
            onPress={handlePress}
          />
        )
      })}
      {closeArrow ? <ModalCloseArrow onPress={handleCancel} /> : null}
    </ThemedModal>
  )
}
