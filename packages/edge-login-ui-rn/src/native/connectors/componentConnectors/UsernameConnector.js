// @flow

import { connect } from 'react-redux'
import { FormField } from '../../components/common/'
import * as loginAction from '../../../common/actions'
import type { State, Dispatch } from '../../../types/ReduxTypes'

type OwnProps = {
  onFinish(): void
}
export const mapStateToProps = (state: State) => {
  return {
    value: state.create.username,
    error: state.create.usernameErrorMessage,
    label: 'Username',
    returnKeyType: 'go',
    autoCorrect: false,
    autoFocus: true // ownProps.autoFocus,
  }
}
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    onChangeText: (data: string) =>
      dispatch(loginAction.validateUsername(data)),
    onSubmitEditing: ownProps.onFinish
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField)
