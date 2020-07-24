// @flow

import { connect } from 'react-redux'

import s from '../../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes'
import { FormField } from '../../components/common'

type OwnProps = {
  onSubmitEditing(): void
}

export const mapStateToProps = (state: RootState) => {
  const value = state.login.otpUserBackupKey || ''
  // $FlowFixMe This doesn't exist in state:
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

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
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
