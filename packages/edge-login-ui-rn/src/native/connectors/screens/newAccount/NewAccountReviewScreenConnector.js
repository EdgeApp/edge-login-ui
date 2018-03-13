// @flow

import { connect } from 'react-redux'

import * as actions from '../../../../common/actions/'
import type { Dispatch, State } from '../../../../types/ReduxTypes'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountReviewScreenComponent'

export const mapStateToProps = (state: State) => {
  return {
    workflow: state.workflow,
    username: state.login.username,
    password: state.login.password,
    pin: state.login.pin
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    nextScreen: () => dispatch(actions.nextScreen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
