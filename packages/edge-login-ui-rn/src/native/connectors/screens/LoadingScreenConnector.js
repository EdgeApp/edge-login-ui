// @flow
import { connect } from 'react-redux'
import LoadingScreenComponent from '../../components/screens/LoadingScreenComponent'
import type { State } from '../../../types/ReduxTypes'
// import * as loginAction from '../../common/actions/'

export const mapStateToProps = (state: State) => {
  return {
    workflow: state.workflow
  }
}

export default connect(mapStateToProps, null)(LoadingScreenComponent)
