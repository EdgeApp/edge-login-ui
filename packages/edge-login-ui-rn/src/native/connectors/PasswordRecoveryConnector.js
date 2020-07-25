// @flow

import { connect } from 'react-redux'

import { initializePasswordRecovery } from '../../common/actions/PasswordRecoveryActions.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes'
import type { OwnProps } from '../components/PasswordRecoveryAppComponent'
import PasswordRecoveryAppComponent from '../components/PasswordRecoveryAppComponent'

export const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  return {
    styles: ownProps.styles,
    showHeader: ownProps.showHeader
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    initializePasswordRecovery: () => dispatch(initializePasswordRecovery())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordRecoveryAppComponent)
