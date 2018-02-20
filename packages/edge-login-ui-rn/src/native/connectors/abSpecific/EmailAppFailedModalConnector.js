import { connect } from 'react-redux'
import { MyModal } from '../../components/common/'
import * as Constants from '../../../common/constants'

export const mapStateToProps = (state, ownProps) => {
  return {
    headerText: "Can't send email",
    middleText:
      "Please set up an email client that is default to your device's OS in order to send a token to yourself",
    icon: Constants.EXCLAMATION,
    iconType: Constants.MATERIAL_ICONS,
    actionLabel: 'Ok',
    hideCancelX: true,
    singleButton: true
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    action: ownProps.action
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
