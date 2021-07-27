import { Airship } from '../components/services/AirshipInstance'
import { useEffect } from '../util/hooks'

/**
 * Clears modals when the component unmounts.
 */
export function useClearOnUnmount() {
  useEffect(() => Airship.clear, [])
}
