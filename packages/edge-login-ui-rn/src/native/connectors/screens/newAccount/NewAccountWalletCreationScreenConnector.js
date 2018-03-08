// @flow

import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountWalletCreationScreenComponent'
import type { State } from '../../../../types/ReduxTypes'

export const mapStateToProps = (state: State) => {
  return {
    auth: state.login,
    workflow: state.workflow
  }
}

export default connect(mapStateToProps, null)(LinkedComponent)
