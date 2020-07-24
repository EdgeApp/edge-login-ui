// @flow

import { connect } from 'react-redux'

import * as Constants from '../../../common/constants'
import s from '../../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes'
import { MyModal } from '../../components/common/'

export const mapStateToProps = (state: RootState) => {
  return {
    headerText: s.strings.skip_modal_header,
    middleText: s.strings.skip_modal_body,
    icon: Constants.EXCLAMATION,
    iconType: Constants.SIMPLE_ICONS,
    actionLabel: s.strings.skip,
    cancelLabel: s.strings.cancel
  }
}
export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    cancel: () => dispatch({ type: 'WORKFLOW_CANCEL_MODAL' }),
    action: () => dispatch({ type: 'WORKFLOW_NEXT' })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)
