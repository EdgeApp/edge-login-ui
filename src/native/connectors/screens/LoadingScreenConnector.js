// @flow

import { connect } from 'react-redux'

import type { State } from '../../../types/ReduxTypes'
import LoadingScreenComponent from '../../components/screens/LoadingScreenComponent'

export const mapStateToProps = (state: State) => {
  return {
    workflow: state.workflow
  }
}

export default connect(mapStateToProps, {})(LoadingScreenComponent)
