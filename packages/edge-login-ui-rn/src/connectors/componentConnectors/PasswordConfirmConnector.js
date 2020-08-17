// @flow

import { validateConfirmPassword } from '../../actions/CreateAccountActions.js'
import s from '../../common/locales/strings.js'
import { FormField } from '../../components/common/index.js'
import { connect } from '../../components/services/ReduxStore.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'

type OwnProps = {
  label?: string,
  autoFocus: boolean,
  onFinish(): void
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const label = ownProps.label ? ownProps.label : s.strings.confirm_password
  const value = state.create.confirmPassword ? state.create.confirmPassword : ''
  const error = state.create.confirmPasswordErrorMessage
    ? state.create.confirmPasswordErrorMessage
    : ''
  return {
    value,
    error,
    secureTextEntry: true,
    showSecureCheckbox: true,
    showSecureCheckboxLabel: s.strings.show_password,
    label: label,
    returnKeyType: 'go',
    autoFocus: ownProps.autoFocus
  }
}
const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => ({
  onChangeText: (data: string) => dispatch(validateConfirmPassword(data)),
  onSubmitEditing: ownProps.onFinish
})

export default connect<
  $Call<typeof mapStateToProps, RootState, OwnProps>,
  $Call<typeof mapDispatchToProps, Dispatch, OwnProps>,
  OwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(FormField)
