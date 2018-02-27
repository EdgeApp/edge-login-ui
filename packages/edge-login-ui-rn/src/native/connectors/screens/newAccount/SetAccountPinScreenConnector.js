// @flow
import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/SetAccountPinScreenComponent'
import * as loginAction from '../../../../common/actions'
import type { State, Dispatch } from '../../../../types/ReduxTypes'

export const mapStateToProps = (state: State) => {
  return {
    username: state.create.username,
    password: state.create.password,
    pin: state.create.pin,
    pinError: state.create.pinError,
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    createUser: (data: Object) => dispatch(loginAction.createUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
