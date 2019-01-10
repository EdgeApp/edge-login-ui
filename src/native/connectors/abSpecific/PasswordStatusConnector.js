// @flow

import { connect } from 'react-redux'

import type { State } from '../../../types/ReduxTypes'
import PasswordStatusComponent from '../../components/abSpecific/PasswordStatusComponent'

export const mapStateToProps = (state: State) => {
  const secondsToCrack = state.passwordStatus
    ? state.passwordStatus.secondsToCrack
    : ''
  return {
    status: state.passwordStatus,
    secondsToCrack
  }
}

export default connect(mapStateToProps, {})(PasswordStatusComponent)
