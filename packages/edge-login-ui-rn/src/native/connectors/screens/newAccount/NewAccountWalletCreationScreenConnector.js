// @flow
import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountWalletCreationScreenComponent'
import * as loginAction from '../../../../common/actions'
import type { State, Dispatch } from '../../../../types/ReduxTypes'

export const mapStateToProps = (state: State) => {
  return {
    auth: state.login,
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    submitPin: (data: string) => dispatch(loginAction.submitPin(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
