// @flow

import { connect } from 'react-redux'

import { type RootState } from '../../../types/ReduxTypes'
import LoadingScreenComponent from '../../components/screens/LoadingScreenComponent'

export const mapStateToProps = (state: RootState) => {
  return {
    workflow: state.workflow
  }
}

export default connect(
  mapStateToProps,
  {}
)(LoadingScreenComponent)
