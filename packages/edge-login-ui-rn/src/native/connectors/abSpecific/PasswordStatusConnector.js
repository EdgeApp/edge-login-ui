import { connect } from 'react-redux'
import PasswordStatusComponent from '../../components/abSpecific/PasswordStatusComponent'

export const mapStateToProps = (state, ownProps) => {
  const secondsToCrack = state.passwordStatus
    ? state.passwordStatus.secondsToCrack
    : ''
  return {
    style: ownProps.style,
    status: state.passwordStatus,
    secondsToCrack
  }
}

export default connect(mapStateToProps, null)(PasswordStatusComponent)
