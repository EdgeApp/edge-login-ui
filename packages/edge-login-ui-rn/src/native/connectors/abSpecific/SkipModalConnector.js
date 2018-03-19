// @flow

import { connect } from 'react-redux'

import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'
import s from '../../../common/locales/strings.js'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { MyModal } from '../../components/common/'

export const mapStateToProps = (state: State) => {
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
    cancel: () => dispatch(actions.cancelSkipStep()),
    action: () => dispatch(actions.nextScreen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
