// @flow

import { connect } from 'react-redux'

import type { State } from '../../../../types/ReduxTypes'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountWalletCreationScreenComponent'

export const mapStateToProps = (state: State) => {
  return {
    auth: state.login,
    workflow: state.workflow
  }
}

export default connect(mapStateToProps, {})(LinkedComponent)
