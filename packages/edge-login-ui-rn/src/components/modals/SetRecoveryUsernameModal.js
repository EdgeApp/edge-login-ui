// @flow

import { connect } from 'react-redux'

import s from '../../common/locales/strings.js'
import * as Constants from '../../constants/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { MyModal } from '../common/index.js'

type OwnProps = {
  cancel(): void,
  action(): void
}

const mapStateToProps = (state: RootState) => {
  return {
    headerText: s.strings.password_recovery,
    icon: Constants.LOCKED_ICON,
    iconType: Constants.ION_ICONS,
    actionLabel: s.strings.next_label,
    hideCancelX: false,
    singleButton: true
  }
}
const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    cancel: ownProps.cancel,
    action: ownProps.action
  }
}
export const SetRecoveryUsernameModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)
