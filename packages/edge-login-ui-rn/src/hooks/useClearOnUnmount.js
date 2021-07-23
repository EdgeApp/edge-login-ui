// @flow

import { Airship } from '../components/services/AirshipInstance.js'
import { useEffect } from '../util/hooks.js'

/**
 * Clears modals when the component unmounts.
 */
export function useClearOnUnmount() {
  useEffect(() => Airship.clear, [])
}
