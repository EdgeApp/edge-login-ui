// @flow

import { connect } from 'react-redux'
import LandingScreenComponent from '../../components/screens/LandingScreenComponent'
import * as actions from '../../../common/actions'
import type { Dispatch } from '../../../types/ReduxTypes'

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    startFlow: (data: string) => dispatch(actions.startWorkflow(data))
  }
}

export default connect(null, mapDispatchToProps)(LandingScreenComponent)
