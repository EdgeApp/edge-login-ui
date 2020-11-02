// @flow
import * as React from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'

import s from '../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { MyModal } from '../common/index.js'
import { ModalStyle } from '../common/Modal.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  cancel(): void,
  action(): void
}

const mapStateToProps = (state: RootState) => ({
  headerText: s.strings.password_recovery,
  icon: (
    <IonIcon
      style={ModalStyle.iconStyle}
      name="ios-lock"
      size={ModalStyle.iconSize}
    />
  ),
  actionLabel: s.strings.next_label,
  hideCancelX: false,
  singleButton: true
})
const mapDispatchToProps = (dispatch: Dispatch) => ({})

export const SetRecoveryUsernameModal = connect<
  $Call<typeof mapStateToProps, RootState>,
  $Call<typeof mapDispatchToProps, Dispatch>,
  OwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)
