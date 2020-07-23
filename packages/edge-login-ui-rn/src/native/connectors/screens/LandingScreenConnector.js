// @flow

import { connect } from 'react-redux'

import type { Dispatch } from '../../../types/ReduxTypes'
import LandingScreenComponent from '../../components/screens/LandingScreenComponent'

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    startFlow: (data: string) =>
      dispatch({ type: 'WORKFLOW_START', data: data })
  }
}

export default connect(
  null,
  mapDispatchToProps
)(LandingScreenComponent)
