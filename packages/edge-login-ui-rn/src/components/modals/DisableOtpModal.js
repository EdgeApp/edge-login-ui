// @flow

import s from '../../common/locales/strings.js'
import * as Constants from '../../constants/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { MyModal } from '../common/index.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  cancel(): void,
  action(): void
}

const mapStateToProps = (state: RootState) => ({
  headerText: s.strings.disable_otp_header,
  middleText: s.strings.disable_otp_modal_body,

  icon: Constants.EXCLAMATION,
  iconType: Constants.SIMPLE_ICONS,
  actionLabel: s.strings.disable_otp_button,
  cancelLabel: s.strings.cancel,
  hideCancelX: true
})
const mapDispatchToProps = (dispatch: Dispatch) => ({})

export const DisableOtpModal = connect<
  $Call<typeof mapStateToProps, RootState>,
  $Call<typeof mapDispatchToProps, Dispatch>,
  OwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)
