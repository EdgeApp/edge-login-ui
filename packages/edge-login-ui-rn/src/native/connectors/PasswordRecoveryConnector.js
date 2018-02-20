import { connect } from 'react-redux'
import PasswordRecoveryAppComponent from '../components/PasswordRecoveryAppComponent'
import * as actions from '../../common/actions/'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    showHeader: ownProps.showHeader,
    accountObject: ownProps.accountObject
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initializePasswordRecovery: account =>
      dispatch(actions.initializePasswordRecovery(account))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  PasswordRecoveryAppComponent
)
