// @flow
import { connect } from 'react-redux'
import { FormField } from '../../components/common'
import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants/'
import type { State, Dispatch } from '../../../types/ReduxTypes'

type OwnProps = {
  onSubmitEditing(): void
}

export const mapStateToProps = (state: State) => {
  const value = state.login.otpUserBackupKey || ''
  const error = state.login.otpErrorMessage || ''
  return {
    value,
    label: 'Backup Key',
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
