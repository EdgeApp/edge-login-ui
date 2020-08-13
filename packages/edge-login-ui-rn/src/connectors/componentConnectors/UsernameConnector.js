// @flow

import { validateUsername } from '../../actions/CreateAccountActions.js'
import s from '../../common/locales/strings.js'
import { FormField } from '../../components/common/index.js'
import { connect } from '../../components/services/ReduxStore.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'

type OwnProps = {
  onFinish(): void
}

const mapStateToProps = (state: RootState) => ({
  value: state.create.username,
  error: state.create.usernameErrorMessage,
  label: s.strings.username,
  returnKeyType: 'go',
  autoCorrect: false,
  autoFocus: true // ownProps.autoFocus,
})
const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => ({
  onChangeText: (data: string) => dispatch(validateUsername(data)),
  onSubmitEditing: ownProps.onFinish
})

export default connect<
  $Call<typeof mapStateToProps, RootState>,
  $Call<typeof mapDispatchToProps, Dispatch, OwnProps>,
  OwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(FormField)
