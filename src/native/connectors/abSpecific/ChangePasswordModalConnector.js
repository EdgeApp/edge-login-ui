import { connect } from 'react-redux'
import {
  ChangePasswordModalComponent
} from '../../components/abSpecific/ChangePasswordModalComponent'
import * as actions from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    style: ownProps.style
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    cancelFunc: () => {
      dispatch(actions.cancelSkipStep())
      dispatch(actions.cancel())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ChangePasswordModalComponent
)
