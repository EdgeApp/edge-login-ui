// @flow

import { Airship } from '../components/services/AirshipInstance.js'
import {
  type Dispatch,
  type GetState,
  type Imports
} from '../types/ReduxTypes.js'

export const onComplete = () => (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
) => {
  Airship.clear()
  imports.onComplete()
}
