import { connect } from 'react-redux'

import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'
import s from '../../../common/locales/strings.js'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { FormFieldWithDropComponent } from '../../components/common/'

type OwnProps = {
  autoFocus: boolean,
  forceFocus: boolean,
  onFocus(): void,
  onBlur(): void,
  getListItemsFunction(): void
}

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const dataList = state.previousUsers.filteredUsernameList
    ? state.previousUsers.filteredUsernameList
    : []
  return {
    value: state.login.username,
    label: s.strings.username,
    returnKeyType: 'next',
    autoFocus: ownProps.autoFocus,
    forceFocus: ownProps.forceFocus,
    dataList: dataList
  }
}
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    onChangeText: (data: string) =>
      dispatch(
        actions.dispatchActionWithData(Constants.AUTH_UPDATE_USERNAME, data)
      ),
    onFocus: ownProps.onFocus,
    onFinish: ownProps.onFinish,
    getListItemsFunction: ownProps.getListItemsFunction
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  FormFieldWithDropComponent
)
