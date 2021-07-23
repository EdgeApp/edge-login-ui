// @flow

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
  imports.onComplete()
}
