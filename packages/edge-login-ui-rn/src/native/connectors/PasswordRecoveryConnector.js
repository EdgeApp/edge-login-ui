// @flow

import { connect } from 'react-redux'

import * as actions from '../../common/actions/'
import type { Dispatch, State } from '../../types/ReduxTypes'
import PasswordRecoveryAppComponent from '../components/PasswordRecoveryAppComponent'
import type { OwnProps } from '../components/PasswordRecoveryAppComponent'

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
  return {
    styles: ownProps.styles,
    showHeader: ownProps.showHeader
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    initializePasswordRecovery: () =>
      dispatch(actions.initializePasswordRecovery())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  PasswordRecoveryAppComponent
)
