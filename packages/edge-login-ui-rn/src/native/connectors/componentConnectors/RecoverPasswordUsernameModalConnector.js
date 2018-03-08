// @flow

import { connect } from 'react-redux'
import { FormField } from '../../components/common'
import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'
import type { State, Dispatch } from '../../../types/ReduxTypes'

type OwnProps = {
  onSubmitEditing(): void
}
export const mapStateToProps = (state: State) => {
  return {
    value: state.login.username,
    label: 'Username',
    error: state.passwordRecovery.recoveryErrorMessage,
    returnKeyType: 'go',
    forceFocus: true
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    onChangeText: (data: string) =>
      dispatch(
        actions.dispatchActionWitString(Constants.AUTH_UPDATE_USERNAME, data)
      ),
    onSubmitEditing: ownProps.onSubmitEditing
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField)
