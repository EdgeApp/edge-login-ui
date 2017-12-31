import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/existingAccout/OtpErrorScreenComponent'
import * as actions from '../../../../common/actions'
export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setbackupKey: () => dispatch(actions.retryWithOtp()),
    resetOtpToken: () => dispatch(actions.resetOtpReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
