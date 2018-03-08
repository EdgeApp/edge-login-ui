// @flow

import { connect } from 'react-redux'

import * as Constants from '../../../common/constants'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { MyModal } from '../../components/common/'

type OwnProps = {
  cancel(): void,
  action(): void
}
export const mapStateToProps = (state: State) => {
  return {
    headerText: 'Are you sure you want to disable 2FA',
    middleText:
      '2FA will take 7 days to disable if no action is taken by the account user on authentiacated devices',
    icon: Constants.EXCLAMATION,
    iconType: Constants.SIMPLE_ICONS,
    actionLabel: 'Disable 2FA',
    cancelLabel: 'Cancel',
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
