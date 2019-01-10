// @flow

import { connect } from 'react-redux'

import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants/'
import s from '../../../common/locales/strings.js'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { FormField } from '../../components/common'

type OwnProps = {
  onSubmitEditing(): void
}

export const mapStateToProps = (state: State) => {
  const value = state.login.otpUserBackupKey || ''
  const error = state.login.otpErrorMessage || ''
  return {
    value,
    label: s.strings.backup_key_label,
    error,
    returnKeyType: 'next',
    autoFocus: true
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    onChangeText: (data: string) =>
      dispatch(
        actions.dispatchActionWitString(
          Constants.AUTH_UPDATE_OTP_BACKUP_KEY,
          data
        )
      ),
    onSubmitEditing: ownProps.onSubmitEditing
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField)
