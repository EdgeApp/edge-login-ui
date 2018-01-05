import { connect } from 'react-redux'
import PasswordRecoveryAppComponent from '../components/PasswordRecoveryAppComponent'
// import * as loginAction from '../../common/actions/'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    showHeader: ownProps.showHeader
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
   /*  userLogin: (data) => dispatch(loginAction.userLogin(data)),
    getPreviousUsers: () => dispatch(loginAction.getPreviousUsers()) */
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecoveryAppComponent)
