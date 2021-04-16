// @flow

import * as React from 'react'
import { type AirshipBridge } from 'react-native-airship'

import { showError } from '../services/AirshipInstance.js'
import { ModalCloseArrow } from '../themed/ModalParts.js'
import {
  type PromiseButtonType,
  PromiseButton
} from '../themed/PromiseButton.js'
import { PrimaryButton, SecondaryButton } from '../themed/ThemedButtons.js'
import { ThemedModal } from '../themed/ThemedModal.js'
import { MessageText, TitleText } from '../themed/ThemedText.js'

export type ButtonInfo = {
  label: string,
  type?: PromiseButtonType,

  // The modal will show a spinner as long as this promise is pending.
  // Returning true will dismiss the modal,
  // but returning false will leave the modal up.
  // Although multiple buttons can be spinning at once,
  // a spinning button cannot be clicked again until the promise resolves.
  onPress?: () => Promise<boolean>
}

export function ButtonsModal<Buttons: { [key: string]: ButtonInfo }>(props: {
  children?: React.Node,
  bridge: AirshipBridge<$Keys<Buttons> | void>,
  buttons: Buttons,
  closeArrow?: boolean,
  message?: string,
  title?: string
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
    <ThemedModal bridge={bridge} onCancel={handleCancel} paddingRem={1}>
      {title != null ? <TitleText>{title}</TitleText> : null}
      {message != null ? <MessageText>{message}</MessageText> : null}
      {children}
      {Object.keys(buttons).map(key => {
        const { type = 'primary', label, onPress } = buttons[key]

        if (onPress != null) {
          return (
            <PromiseButton
              key={key}
              type={buttons[key].type}
              label={buttons[key].label}
              onPress={onPress}
              onReject={showError}
              onResolve={result => {
                if (result) bridge.resolve(key)
              }}
            />
          )
        }

        switch (type) {
          case 'primary':
            return (
              <PrimaryButton
                key={key}
                label={label}
                onPress={() => bridge.resolve(key)}
                marginRem={0.5}
              />
            )
          case 'secondary':
            return (
              <SecondaryButton
                key={key}
                label={label}
                onPress={() => bridge.resolve(key)}
                marginRem={0.5}
              />
            )
          default:
            return null
        }
      })}
      {closeArrow ? <ModalCloseArrow onPress={handleCancel} /> : null}
    </ThemedModal>
  )
}
