import { connect } from 'react-redux'

import * as Constants from '../../../common/constants'
import s from '../../../common/locales/strings.js'
import { Dispatch, State } from '../../../types/ReduxTypes'
import { MyModal } from '../../components/common/'

type OwnProps = {
  cancel(): void,
  action(): void
}
export const mapStateToProps = (state: State) => {
  return {
    headerText: s.strings.save_recovery_token,
    icon: Constants.MAIL,
    iconType: Constants.ION_ICONS,
    actionLabel: s.strings.next_label,
    cancelLabel: s.strings.cancel,
    hideCancelX: true
  }
}
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    cancel: ownProps.cancel,
    action: ownProps.action
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
