import { connect } from 'react-redux'
import {SkipModalComponent}
  from '../../components/abSpecific/SkipModalComponent'
import * as actions from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    style: ownProps.style
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    cancelFunc: () => dispatch(actions.cancelSkipStep()),
    skipFunc: () => dispatch(actions.nextScreen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SkipModalComponent)
