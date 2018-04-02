// @flow

import type { AbcAccount } from 'edge-core-js'
import { connect } from 'react-redux'

import * as actions from '../../../../common/actions/'
import type { Dispatch, State } from '../../../../types/ReduxTypes'
import LinkedComponent from '../../../components/screens/newAccount/TermsAndConditionsScreenComponent'

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
