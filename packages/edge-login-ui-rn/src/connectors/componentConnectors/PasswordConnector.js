// @flow

import { validatePassword } from '../../actions/CreateAccountActions.js'
import s from '../../common/locales/strings.js'
import { FormField } from '../../components/common/index.js'
import { connect } from '../../components/services/ReduxStore.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'

type OwnProps = {
  label: string,
  autoFocus: boolean,
  onFinish(): void
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const value = state.create.password ? state.create.password : ''
  const error = state.create.createPasswordErrorMessage
    ? state.create.createPasswordErrorMessage
    : ''
  return {
    value,
    error,
    secureTextEntry: true,
    showSecureCheckbox: true,
    showSecureCheckboxLabel: s.strings.show_password,
    label: ownProps.label,
    returnKeyType: 'next',
    autoFocus: ownProps.autoFocus
  }
}
const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => ({
  onChangeText: (data: string) => dispatch(validatePassword(data)),
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
