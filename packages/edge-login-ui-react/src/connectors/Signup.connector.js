import { connect } from 'react-redux'

import Signup from '../components/Signup'

const mapStateToProps = state => {
  return {
    page: state.signupPage
  }
}

export default connect(mapStateToProps)(Signup)
