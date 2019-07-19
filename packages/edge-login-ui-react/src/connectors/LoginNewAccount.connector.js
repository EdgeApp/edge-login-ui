import { connect } from 'react-redux'

import { openLogin, openLoginUsingEdge } from '../actions/Login.action'
import LoginNewAccount from '../components/LoginNewAccount'

const mapStateToProps = state => {
  return {
    view: state.login.mobileShowQRCode,
    edgeUsername: state.login.edgeUsername,
    edgeAccount: state.login.edgeAccount,
    edgeObject: state.login.edgeLoginResults
  }
}

export const mapDispatchToProps = (dispatch, props) => {
  return {
    goToSignupPage: () => props.history.push('/signup'),
    handleOpenLoginWithPasswordPage: () => dispatch(openLogin()),
    handleOpenLoginUsingEdgePage: () => dispatch(openLoginUsingEdge())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginNewAccount)
