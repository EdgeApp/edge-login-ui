import { connect } from 'react-redux'

import { userLogin } from '../actions/Login.action'
import Account from '../components/Account'

const mapStateToProps = state => {
  return {
    page: state.accountPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: account => dispatch(userLogin(account))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
