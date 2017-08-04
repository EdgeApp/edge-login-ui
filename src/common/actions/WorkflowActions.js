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

export function skipStep () {
  return {
    type: Constants.WORKFLOW_SKIP
  }
}

export function goBack () {
  return {
    type: Constants.LOG_IN_PIN
  }
}

