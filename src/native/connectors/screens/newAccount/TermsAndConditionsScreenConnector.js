import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/TermsAndConditionsScreenComponent'
import * as actions from '../../../../common/actions/'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    workflow: state.workflow,
    accountObject: state.login.accountObject
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    agreeToCondition: (data) => dispatch(actions.agreeToConditions(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
