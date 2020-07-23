// @flow

import { connect } from 'react-redux'

import s from '../../../common/locales/strings.js'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { FormField } from '../../components/common'

type OwnProps = {
  onSubmitEditing(): void
}
export const mapStateToProps = (state: State) => {
  return {
    value: state.login.username,
    label: s.strings.username,
    error: state.passwordRecovery.recoveryErrorMessage,
    returnKeyType: 'go',
    forceFocus: true
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    onChangeText: (data: string) =>
      dispatch({ type: 'AUTH_UPDATE_USERNAME', data: data }),
    onSubmitEditing: ownProps.onSubmitEditing
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormField)
