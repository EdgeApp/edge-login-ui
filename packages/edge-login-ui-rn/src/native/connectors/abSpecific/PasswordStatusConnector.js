// @flow

import { connect } from 'react-redux'
import PasswordStatusComponent from '../../components/abSpecific/PasswordStatusComponent'
import type { State } from '../../../types/ReduxTypes'

export const mapStateToProps = (state: State) => {
  const secondsToCrack = state.passwordStatus
    ? state.passwordStatus.secondsToCrack
    : ''
  return {
    status: state.passwordStatus,
    secondsToCrack
  }
}

export default connect(mapStateToProps, null)(PasswordStatusComponent)
