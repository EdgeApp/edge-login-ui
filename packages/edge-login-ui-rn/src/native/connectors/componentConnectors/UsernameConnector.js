// @flow

import { connect } from 'react-redux'

import * as loginAction from '../../../common/actions'
import s from '../../../common/locales/strings.js'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { FormField } from '../../components/common/'

type OwnProps = {
  onFinish(): void
}
export const mapStateToProps = (state: State) => {
  return {
    value: state.create.username,
    error: state.create.usernameErrorMessage,
    label: s.strings.username,
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
