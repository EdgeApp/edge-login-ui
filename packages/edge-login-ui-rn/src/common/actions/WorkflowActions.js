import * as Constants from '../constants'

export function startWorkflow (data) {
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

export function skipStep (data) {
  return {
    type: Constants.WORKFLOW_SKIP,
    data
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
  return (dispatch, getState, imports) => {
    const onCancel = imports.onCancel
    onCancel()
  }
}
