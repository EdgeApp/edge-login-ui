import { connect } from 'react-redux'

import { closeLoginUsingEdge, requestEdgeLogin } from '../actions/Login.action'
import { openNotification } from '../actions/Notification.action'
import LoginEdge from '../components/LoginEdge'
import { edgeLogin } from '../middlewares/Login.middleware'

const mapStateToProps = state => {
  return {
    view: state.login.mobileShowQRCode,
    edgeObject: state.login.edgeLoginResults
  }
}

export const mapDispatchToProps = (dispatch, props) => {
  return {
    closeLoginEdgePage: () => dispatch(closeLoginUsingEdge()),
    edgeLogin: () => {
      dispatch(
        edgeLogin((error, account) => {
          if (error) {
            dispatch(openNotification(error))
          }
          if (window.abcui.loginCallback) {
            return window.abcui.loginCallback(null, account)
          }
          return props.history.push('/account')
        })
      )
    },
    removeEdgePolling: edgeObject => {
      edgeObject.cancelRequest()
      dispatch(requestEdgeLogin(null))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginEdge)
