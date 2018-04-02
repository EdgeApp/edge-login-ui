// @flow

import { connect } from 'react-redux'

import * as Constants from '../../../common/constants'
import s from '../../../common/locales/strings.js'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { MyModal } from '../../components/common/'

type OwnProps = {
  action(): void
}
export const mapStateToProps = (state: State) => {
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
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    action: ownProps.action
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
