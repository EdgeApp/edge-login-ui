// @flow

import { connect } from 'react-redux'

import * as Constants from '../../../common/constants'
import s from '../../../common/locales/strings.js'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { MyModal } from '../../components/common/'

type OwnProps = {
  cancel(): void,
  action(): void
}
export const mapStateToProps = (state: State) => {
  return {
    headerText: s.strings.disable_otp_header,
    middleText: s.strings.disable_otp_modal_body,

    icon: Constants.EXCLAMATION,
    iconType: Constants.SIMPLE_ICONS,
    actionLabel: s.strings.disable_otp_button,
    cancelLabel: s.strings.cancel,
    hideCancelX: true
  }
}
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    cancel: () => ownProps.cancel(),
    action: () => ownProps.action()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
