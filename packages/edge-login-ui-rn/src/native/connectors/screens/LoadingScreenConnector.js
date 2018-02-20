import { connect } from 'react-redux'
import LoadingScreenComponent from '../../components/screens/LoadingScreenComponent'
// import * as loginAction from '../../common/actions/'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // userLogin: (data) => dispatch(loginAction.userLogin(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  LoadingScreenComponent
)
