// @flow
import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/TermsAndConditionsScreenComponent'
import * as actions from '../../../../common/actions/'
import type { State, Dispatch } from '../../../../types/ReduxTypes'
import type { AbcAccount } from 'edge-login'
export const mapStateToProps = (state: State) => {
  return {
    workflow: state.workflow,
    accountObject: state.create.accountObject,
    terms: state.terms
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    agreeToCondition: (data: AbcAccount) =>
      dispatch(actions.agreeToConditions(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
