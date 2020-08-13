// @flow

import { sprintf } from 'sprintf-js'

import { deleteUserFromDevice } from '../../actions/UserActions.js'
import s from '../../common/locales/strings.js'
import * as Constants from '../../constants/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { MyModal } from '../common/index.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  username: string
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
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
const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => ({
  cancel: () => dispatch({ type: 'WORKFLOW_CANCEL_MODAL' }),
  action: () => dispatch(deleteUserFromDevice(ownProps.username))
})

export const DeleteUserModal = connect<
  $Call<typeof mapStateToProps, RootState, OwnProps>,
  $Call<typeof mapDispatchToProps, Dispatch, OwnProps>,
  OwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)