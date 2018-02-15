import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountReviewScreenComponent'
import * as actions from '../../../../common/actions/'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    workflow: state.workflow,
    username: state.login.username,
    password: state.login.password,
    pin: state.login.pin
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    nextScreen: () => dispatch(actions.nextScreen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
