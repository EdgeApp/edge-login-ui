// @flow

import { connect } from 'react-redux'

import * as actions from '../../../../common/actions/'
import * as Constants from '../../../../common/constants'
import { type Dispatch, type RootState } from '../../../../types/ReduxTypes'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountWelcomeScreenComponent'

export const mapStateToProps = (state: RootState) => {
  return {
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    nextScreen: () => {
      global.firebase &&
        global.firebase.analytics().logEvent(`Signup_Welcome_Next`)
      dispatch({ type: 'WORKFLOW_NEXT' })
    },
    createUser: (data: Object) => dispatch(actions.createUser(data)),
    exitScreen: () =>
      dispatch({ type: 'WORKFLOW_START', data: Constants.WORKFLOW_INIT })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedComponent)
