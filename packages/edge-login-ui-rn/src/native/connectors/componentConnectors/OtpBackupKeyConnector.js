import { connect } from 'react-redux'
import {FormField} from '../../components/common'
import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants/'
export const mapStateToProps = (state, ownProps) => {
  const value = state.login.otpUserBackupKey || ''
  const error = state.login.otpErrorMessage || ''
  return {
    style: ownProps.style,
    value,
    label: 'Backup Key',
    error,
    returnKeyType: 'next',
    autoFocus: true
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: (data) => dispatch(actions.dispatchActionWithData(Constants.AUTH_UPDATE_OTP_BACKUP_KEY, data)),
    onSubmitEditing: ownProps.onSubmitEditing
    /* onBlur: ownProps.onBlur,
    onFocus: ownProps.onFocus */
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField)
