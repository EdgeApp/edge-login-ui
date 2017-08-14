import { connect } from 'react-redux'
import PasswordStatusComponent
  from '../../components/abSpecific/PasswordStatusComponent'

export const mapStateToProps = (state, ownProps) => {
  return {
    style: ownProps.style,
    status: state.passwordStatus
  }
}

export default connect(mapStateToProps, null)(
  PasswordStatusComponent
)
