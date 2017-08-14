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
  console.log('SKIP ')
  return {
    type: Constants.WORKFLOW_SKIP,
    data
  }
}

export function goBack () {
  return {
    type: Constants.WORKFLOW_BACK
  }
}
