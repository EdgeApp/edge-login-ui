import { connect } from 'react-redux'
import LandingScreenComponent from '../../components/screens/LandingScreenComponent'
import * as actions from '../../../common/actions'
export const mapStateToProps = (state, ownProps) => {
  return {

  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startFlow: (data) => dispatch(actions.startWorkflow(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreenComponent)
