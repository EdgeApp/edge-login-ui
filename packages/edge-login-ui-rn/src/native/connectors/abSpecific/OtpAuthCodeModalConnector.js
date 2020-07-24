// @flow

import { connect } from 'react-redux'

import s from '../../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes'
import { OTP_SMALL } from '../../assets/'
import { MyModal } from '../../components/common/'

type OwnProps = {
  middle: any,
  thinking: boolean,
  cancel(): void,
  action(): void
}

export const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const { otpUserBackupKey } = state.login
  return {
    headerText: s.strings.otp_auth_code_header,
    modalMiddleComponent: ownProps.middle,
    image: OTP_SMALL,
    actionLabel: s.strings.done,
    cancelLabel: s.strings.cancel,
    hideCancelX: true,
    thinking: ownProps.thinking,
    singleCancelButton: !otpUserBackupKey || otpUserBackupKey.length < 16
  }
}
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    cancel: () => ownProps.cancel(),
    action: () => ownProps.action()
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)
