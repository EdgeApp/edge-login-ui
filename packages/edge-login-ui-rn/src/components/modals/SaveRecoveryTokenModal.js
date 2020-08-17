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
  headerText: s.strings.save_recovery_token,
  icon: Constants.MAIL,
  iconType: Constants.ION_ICONS,
  actionLabel: s.strings.next_label,
  cancelLabel: s.strings.cancel,
  hideCancelX: true
})
const mapDispatchToProps = (dispatch: Dispatch) => ({})

export const SaveRecoveryTokenModal = connect<
  $Call<typeof mapStateToProps, RootState>,
  $Call<typeof mapDispatchToProps, Dispatch>,
  OwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)
