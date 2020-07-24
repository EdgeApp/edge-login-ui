// @flow

import { connect } from 'react-redux'

import * as loginAction from '../../../../common/actions'
import { type Dispatch, type RootState } from '../../../../types/ReduxTypes'
import LinkedComponent from '../../../components/screens/newAccount/SetAccountPinScreenComponent'

export const mapStateToProps = (state: RootState) => {
  return {
    username: state.create.username,
    password: state.create.password,
    pin: state.create.pin,
    pinError: state.create.pinError,
    createErrorMessage: state.create.createErrorMessage,
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    createUser: (data: Object) => {
      dispatch({ type: 'CLEAR_CREATE_ERROR_MESSAGE' })
      dispatch(loginAction.createUser(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedComponent)
