import { connect } from 'react-redux'

import Login from '../components/Login'

const mapStateToProps = state => {
  return {
    pin: state.login.viewPIN,
    edge: state.login.viewEdge,
    password: state.login.viewPassword,
    mobileLogin: state.login.mobileLoginView,
    edgeObject: state.login.edgeLoginResults
  }
}

export default connect(mapStateToProps)(Login)
