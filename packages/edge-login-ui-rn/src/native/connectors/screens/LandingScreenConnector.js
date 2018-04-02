// @flow

import { connect } from 'react-redux'

import * as actions from '../../../common/actions'
import type { Dispatch } from '../../../types/ReduxTypes'
import LandingScreenComponent from '../../components/screens/LandingScreenComponent'

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    startFlow: (data: string) => dispatch(actions.startWorkflow(data))
  }
}

export default connect(null, mapDispatchToProps)(LandingScreenComponent)
