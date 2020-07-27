// @flow

import { connect } from 'react-redux'

import * as Constants from '../../../common/constants'
import s from '../../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { MyModal } from '../common/index.js'

type OwnProps = {
  action(): void
}
const mapStateToProps = (state: RootState) => {
  return {
    headerText: s.strings.send_email_error_header,
    middleText: s.strings.email_error_modal,
    icon: Constants.EXCLAMATION,
    iconType: Constants.MATERIAL_ICONS,
    actionLabel: s.strings.ok,
    hideCancelX: true,
    singleButton: true
  }
}
const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    action: ownProps.action
  }
}
export const EmailAppFailedModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)
