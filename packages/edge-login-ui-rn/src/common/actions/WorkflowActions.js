// @flow

import type { Dispatch, GetState, Imports } from '../../types/ReduxTypes'
import * as Constants from '../constants'

export function startWorkflow (data: string) {
  return {
    type: Constants.WORKFLOW_START,
    data
  }
}

export function nextScreen () {
  return {
    type: Constants.WORKFLOW_NEXT
  }
}

export function cancelSkipStep () {
  return {
    type: Constants.WORKFLOW_CANCEL_MODAL
  }
}

export function goBack () {
  return {
    type: Constants.WORKFLOW_BACK
  }
}
export function cancel () {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const onCancel = imports.onCancel
    onCancel()
  }
}
