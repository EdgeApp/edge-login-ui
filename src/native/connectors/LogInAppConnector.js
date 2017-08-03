import { connect } from 'react-redux'
import LoginAppComponent from '../components/LogInAppComponent'
import * as loginAction from '../../common/actions/'

export const mapStateToProps = (state, ownProps) => {
  return {
    context: ownProps.context,
    onLogin: ownProps.onLogin,
    previousUsers: state.previousUsers
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    userLogin: (data) => dispatch(loginAction.userLogin(data)),
    getPreviousUsers: () => dispatch(loginAction.getPreviousUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginAppComponent)
