import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/existingAccout/OtpErrorScreenComponent'
import * as actions from '../../../../common/actions'
// import * as Constants from '../../../../common/constants'
export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setbackupKey: (data) => dispatch(actions.retryWithOtp(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
