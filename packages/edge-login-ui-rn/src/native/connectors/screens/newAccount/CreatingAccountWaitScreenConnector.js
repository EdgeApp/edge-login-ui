import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/CreatingAccountWaitScreenComponent'
import * as actions from '../../../../common/actions'
import type { State, Dispatch } from '../../../../types/ReduxTypes'

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
