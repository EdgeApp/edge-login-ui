import * as React from 'react'

import { Airship } from '../components/services/AirshipInstance'

/**
 * Clears modals when the component unmounts.
 */
export function useClearOnUnmount() {
  React.useEffect(() => Airship.clear, [])
}
