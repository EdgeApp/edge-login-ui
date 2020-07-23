import { connect } from 'react-redux'

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
    nextScreen: () => dispatch({ type: 'WORKFLOW_NEXT' })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedComponent)
