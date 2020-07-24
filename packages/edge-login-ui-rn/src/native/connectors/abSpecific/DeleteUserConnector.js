// @flow

import { connect } from 'react-redux'
import { sprintf } from 'sprintf-js'

import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'
import s from '../../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes'
import { MyModal } from '../../components/common/'

type OwnProps = {
  username: string
}
export const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const middleText = sprintf(
    s.strings.delete_username_account,
    ownProps.username
  )
  return {
    headerText: s.strings.delete_account,
    middleText,
    icon: Constants.TRASH_O,
    iconType: Constants.FONT_AWESOME,
    actionLabel: s.strings.delete,
    cancelLabel: s.strings.cancel
  }
}
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    cancel: () => dispatch({ type: 'WORKFLOW_CANCEL_MODAL' }),
    action: () => dispatch(actions.deleteUserFromDevice(ownProps.username))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)
