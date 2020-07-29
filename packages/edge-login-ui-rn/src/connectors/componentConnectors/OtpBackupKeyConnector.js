// @flow

import { connect } from 'react-redux'

import s from '../../common/locales/strings.js'
import { FormField } from '../../components/common'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'

type OwnProps = {
  onSubmitEditing(): void
}

const mapStateToProps = (state: RootState) => {
  const value = state.login.otpUserBackupKey || ''
  const error = state.login.otpErrorMessage || ''
  return {
    value,
    label: s.strings.backup_key_label,
    error,
    returnKeyType: 'next',
    autoFocus: true,
    autoCapitalize: 'characters'
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    onChangeText: (data: string) =>
      dispatch({ type: 'AUTH_UPDATE_OTP_BACKUP_KEY', data: data }),
    onSubmitEditing: ownProps.onSubmitEditing
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormField)
