import { connect } from 'react-redux'

import * as actions from '../../../../common/actions'
import type { Dispatch, State } from '../../../../types/ReduxTypes'
import LinkedComponent from '../../../components/screens/newAccount/CreatingAccountWaitScreenComponent'

export const mapStateToProps = (state: State) => {
  return {
    createSuccess: state.login.creationSuccess,
    createErrorMessage: state.login.createErrorMessage
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    nextScreen: () => dispatch(actions.nextScreen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
