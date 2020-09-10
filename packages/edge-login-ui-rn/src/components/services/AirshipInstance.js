// @flow

import * as React from 'react'
import { AirshipToast, makeAirship } from 'react-native-airship'

export const Airship = makeAirship()

/**
 * Shows an error to the user, and logs it to the console.
 */
export function showError(error: mixed): void {
  console.log(error)
  Airship.show(bridge => (
    <AirshipToast bridge={bridge} message={String(error)} />
  ))
}

/**
 * Shows a message to the user.
 * Used when some user-requested operation succeeds.
 */
export function showToast(message: string): void {
  Airship.show(bridge => <AirshipToast bridge={bridge} message={message} />)
}
