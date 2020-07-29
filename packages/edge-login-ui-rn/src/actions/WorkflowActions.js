// @flow

import {
  type Dispatch,
  type GetState,
  type Imports
} from '../types/ReduxTypes.js'

export function cancel() {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const onCancel = imports.onCancel
    onCancel()
  }
}
