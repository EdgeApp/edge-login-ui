import { connect } from 'react-redux'
import { EdgeLoginQrComponent } from '../../components/abSpecific'
import { EdgeLoginQrStyle } from '../../../native/styles'
import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'
export const mapStateToProps = (state, ownProps) => {
  return {
    style: EdgeLoginQrStyle,
    isVisible: state.workflow.currentKey === Constants.WORKFLOW_OTP || false
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getQrCode: () => dispatch(actions.getEdgeLoginQrCode())
   /*  onChangeText: (data) => dispatch(actions.dispatchActionWithData(Constants.AUTH_UPDATE_OTP_BACKUP_KEY, data)),
    onSubmitEditing: ownProps.onSubmitEditing */
    /* onBlur: ownProps.onBlur,
    onFocus: ownProps.onFocus */
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EdgeLoginQrComponent)
