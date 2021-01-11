import { connect } from 'react-redux'

import { changeAccountPage } from '../actions/Account.action'
import { openAccountCreatedModal } from '../actions/ModalAccountCreated.action'
import {
  hideSignInDetails,
  showSignInDetails
} from '../actions/SignupReviewDetails.action'
import SignupReviewDetails from '../components/SignupReviewDetails'

const mapStateToProps = state => {
  return {
    account: state.user,
    details: state.reviewDetails.details,
    visibility: state.reviewDetails.view,
    accountCreatedModal: state.modal.accountCreated
  }
}

export const mapDispatchToProps = (dispatch, props) => {
  return {
    openModalAccountCreated: () => dispatch(openAccountCreatedModal()),
    toggleDetails: visibility => {
      if (visibility) {
        return dispatch(hideSignInDetails())
      }
      return dispatch(showSignInDetails())
    },
    openRecoveryPassword: () => {
      dispatch(changeAccountPage('recovery'))
      return props.history.push('/account')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupReviewDetails)
