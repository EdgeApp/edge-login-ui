import React, { Component } from 'react'
const QRCode = require('qrcode.react')
import { withRouter } from 'react-router'

import { connect } from 'react-redux'
import t from 'lib/web/LocaleStrings'

import { edgeLogin } from './Login.middleware'
import { closeLoading } from '../Loader/Loader.action'

class LoginEdge extends Component {
  componentWillUnmount () {
    if (this.props.edgeObject) {
      this.props.edgeObject.cancelRequest()
    }
  }

  componentDidMount () {
    const { dispatch } = this.props
    // if (!edgeId) {
    dispatch(
        edgeLogin((error, account) => {
          if (!error) {
            if (window.parent.loginCallback) {
              return window.parent.loginCallback(null, account)
            }
            if (!window.parent.loginCallback) {
              this.props.dispatch(closeLoading())
              return this.props.router.push('/home')
            }
          }
        })
      )
    // }
  }

  renderBarcode () {
    const { edgeId } = this.props
    if (edgeId) {
      const qrCodeVal = 'airbitz://edge/' + edgeId
      return <QRCode value={qrCodeVal} size={205} />
    } else {
      return null
    }
  }

  renderLoginLink () {
    const { edgeId } = this.props

    if (edgeId) {
      return `https://airbitz.co/elf/?address=${edgeId}`
    }
  }

  render () {
    const { edgeUsername } = this.props

    return (
      <div style={style.container}>
        <div style={style.topText}>
          {this.props.register ? t('string_scan_barcode_to_register') : t('string_scan_barcode_to_signin')}
        </div>
        {!edgeUsername ? (
          <div>
            <a target='_blank' href={this.renderLoginLink()}>{this.renderBarcode()}</a>
          </div>
        ) : (
          <div>
            <b>{edgeUsername}</b><br />
            {t('approving_login_text')}<br />
          </div>)}
        </div>
    )
  }
}

const style = {

  container: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center'
  },

  topText: {
    width: '217px',
    color: '#909091',
    fontSize: '19px',
    lineHeight: '24px',
    textAlign: 'center',
    marginBottom: '35px'
  },

  logoIcon: {
    'width': '28px',
    'padding': '4px',
    'verticalAlign': 'top'
  },
  edgeLoginBtn: {
    margin: '0px auto',
    textAlign: 'center',
    padding: '0 10px',
    lineHeight: '2.2rem'
  },
  dividerContainer: {
    textAlign: 'center',
    margin: '40px 0 0px 0px'
  },
  divider: {
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  barCode: {
    height: '275px'
  }
}

const LoginEdgeWithRouter = withRouter(LoginEdge)
const LoginEdgeWithRedux = connect(state => ({
  edgeId: state.login.edgeLoginResults.id,
  edgeUsername: state.login.edgeUsername,
  edgeAccount: state.login.edgeAccount,
  edgeObject: state.login.edgeLoginResults
}))(LoginEdgeWithRouter)

export default LoginEdgeWithRedux
