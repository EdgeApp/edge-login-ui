// @flow

import { connect } from 'react-redux'

import type { Dispatch, State } from '../../../types/ReduxTypes'
import { OTP_SMALL } from '../../assets/'
import { MyModal } from '../../components/common/'

type OwnProps = {
  middle: any,
  thinking: boolean,
  cancel(): void,
  action(): void
}

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
  return {
    headerText: 'Enter Authentication Code',
    // middleText: 'Sign into your account using the device you setup 2FA with, and go to Settings > 2 Factor Authentication to find the code.',
    modalMiddleComponent: ownProps.middle,
    image: OTP_SMALL,
    actionLabel: 'Done',
    cancelLabel: 'Cancel',
    hideCancelX: true,
    thinking: ownProps.thinking
  }
}
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    cancel: () => ownProps.cancel(),
    action: () => ownProps.action()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
