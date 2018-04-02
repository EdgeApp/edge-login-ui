import { connect } from 'react-redux'

import * as loginAction from '../../../../common/actions'
import type { Dispatch, State } from '../../../../types/ReduxTypes'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountUsernameScreenComponent'

export const mapStateToProps = (state: State) => {
  return {
    workflow: state.workflow,
    username: state.create.username,
    usernameErrorMessage: state.create.usernameErrorMessage
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    checkUsernameForAvailabilty: (data: string) =>
      dispatch(loginAction.checkUsernameForAvailabilty(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
