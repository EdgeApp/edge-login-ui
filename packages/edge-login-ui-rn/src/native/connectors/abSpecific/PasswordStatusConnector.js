// @flow

import { connect } from 'react-redux'

import { type RootState } from '../../../types/ReduxTypes'
import PasswordStatusComponent from '../../components/abSpecific/PasswordStatusComponent'

export const mapStateToProps = (state: RootState) => {
  const secondsToCrack = state.passwordStatus
    ? state.passwordStatus.secondsToCrack
    : ''
  return {
    status: state.passwordStatus,
    secondsToCrack
  }
}

export default connect(
  mapStateToProps,
  {}
)(PasswordStatusComponent)
