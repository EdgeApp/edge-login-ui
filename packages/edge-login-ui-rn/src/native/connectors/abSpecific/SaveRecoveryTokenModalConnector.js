import { connect } from 'react-redux'
import { MyModal } from '../../components/common/'
import * as Constants from '../../../common/constants'
import { Dispatch, State } from '../../../types/ReduxTypes'

type OwnProps = {
  cancel(): void,
  action(): void
}
export const mapStateToProps = (state: State) => {
  return {
    headerText: 'Save recovery token',
    icon: Constants.MAIL,
    iconType: Constants.ION_ICONS,
    actionLabel: 'Next',
    cancelLabel: 'Cancel',
    hideCancelX: true
  }
}
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    cancel: ownProps.cancel,
    action: ownProps.action
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
