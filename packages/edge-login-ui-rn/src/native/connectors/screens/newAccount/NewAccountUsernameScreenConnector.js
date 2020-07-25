// @flow

import { connect } from 'react-redux'

import { checkUsernameForAvailabilty } from '../../../../common/actions/CreateAccountActions.js'
import { type Dispatch, type RootState } from '../../../../types/ReduxTypes'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountUsernameScreenComponent'

export const mapStateToProps = (state: RootState) => {
  return {
    workflow: state.workflow,
    username: state.create.username,
    usernameErrorMessage: state.create.usernameErrorMessage
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    checkUsernameForAvailabilty: (data: string) =>
      dispatch(checkUsernameForAvailabilty(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedComponent)
