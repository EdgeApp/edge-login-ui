// @flow
import * as React from 'react'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'

import s from '../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { MyModal } from '../common/index.js'
import { ModalStyle } from '../common/Modal.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  action(): void
}

const mapStateToProps = (state: RootState) => ({
  headerText: s.strings.send_email_error_header,
  middleText: s.strings.email_error_modal,
  icon: (
    <SimpleIcon
      style={ModalStyle.iconStyle}
      name="exclamation"
      size={ModalStyle.iconSize}
    />
  ),
  actionLabel: s.strings.ok,
  hideCancelX: true,
  singleButton: true
})
const mapDispatchToProps = (dispatch: Dispatch) => ({})

export const EmailAppFailedModal = connect<
  $Call<typeof mapStateToProps, RootState>,
  $Call<typeof mapDispatchToProps, Dispatch>,
  OwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)
