// @flow
import * as React from 'react'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'

import { cancel } from '../../actions/WorkflowActions.js'
import s from '../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { MyModal } from '../common/index.js'
import { ModalStyle } from '../common/Modal.js'
import { connect } from '../services/ReduxStore.js'

const mapStateToProps = (state: RootState) => ({
  headerText: s.strings.pin_changed,
  headerSubtext: s.strings.pin_successfully_changed,
  middleText: '',
  icon: (
    <SimpleIcon
      style={ModalStyle.iconStyle}
      name="exclamation"
      size={ModalStyle.iconSize}
    />
  ),
  actionLabel: s.strings.ok,
  cancelLabel: s.strings.cancel,
  singleButton: true
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  cancel: () => {
    dispatch({ type: 'CLOSE_NOTIFICATION_MODAL' })
    dispatch(cancel())
  },
  action: () => {
    dispatch({ type: 'CLOSE_NOTIFICATION_MODAL' })
    dispatch(cancel())
  }
})

export const ChangePinModal = connect<
  $Call<typeof mapStateToProps, RootState>,
  $Call<typeof mapDispatchToProps, Dispatch>,
  {}
>(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)
