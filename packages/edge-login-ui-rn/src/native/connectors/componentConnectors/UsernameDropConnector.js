import { connect } from 'react-redux'
import { FormFieldWithDropComponent } from '../../components/common/'
import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'
export const mapStateToProps = (state, ownProps) => {
  const dataList = state.previousUsers.filteredUsernameList
    ? state.previousUsers.filteredUsernameList
    : []
  return {
    style: ownProps.style,
    value: state.login.username,
    label: 'Username', // TODO: Localization
    returnKeyType: 'next',
    autoFocus: ownProps.autoFocus,
    forceFocus: ownProps.forceFocus,
    onFocus: ownProps.onFocus,
    onFinish: ownProps.onFinish,
    dataList: dataList,
    getListItemsFunction: ownProps.getListItemsFunction
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: data =>
      dispatch(
        actions.dispatchActionWithData(Constants.AUTH_UPDATE_USERNAME, data)
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  FormFieldWithDropComponent
)
