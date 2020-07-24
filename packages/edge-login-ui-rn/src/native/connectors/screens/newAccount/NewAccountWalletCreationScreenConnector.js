// @flow

import { connect } from 'react-redux'

import { type RootState } from '../../../../types/ReduxTypes'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountWalletCreationScreenComponent'

export const mapStateToProps = (state: RootState) => {
  return {
    auth: state.login,
    workflow: state.workflow
  }
}

export default connect(
  mapStateToProps,
  {}
)(LinkedComponent)
