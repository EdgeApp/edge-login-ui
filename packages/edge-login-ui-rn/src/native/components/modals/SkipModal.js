// @flow

import { connect } from 'react-redux'

import * as Constants from '../../../common/constants'
import s from '../../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { MyModal } from '../common/index.js'

const mapStateToProps = (state: RootState) => {
  return {
    headerText: s.strings.skip_modal_header,
    middleText: s.strings.skip_modal_body,
    icon: Constants.EXCLAMATION,
    iconType: Constants.SIMPLE_ICONS,
    actionLabel: s.strings.skip,
    cancelLabel: s.strings.cancel
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    cancel: () => dispatch({ type: 'WORKFLOW_CANCEL_MODAL' }),
    action: () => dispatch({ type: 'WORKFLOW_NEXT' })
  }
}

export const SkipModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)
