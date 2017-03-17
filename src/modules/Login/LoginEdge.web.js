import React, { Component } from 'react'
const QRCode = require('qrcode.react');
import { withRouter } from 'react-router'
import { Button, IconButton } from 'react-toolbox/lib/button'

import { connect } from 'react-redux'
import t from 'lib/web/LocaleStrings'
import logo from '../../img/logo_icon.png'

import { edgeLogin } from './Login.middleware'
import { openLoading, closeLoading } from '../Loader/Loader.action'

class LoginEdge extends Component {

  componentDidMount () {
    const { edgeId, dispatch } = this.props
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
    if(edgeId) {
      return (<QRCode value={edgeId} style={{margin: '0px auto', width: '128px'}}/>)
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
      <div>
        <div style={style.container}>
          <div style={style.edgeLoginBtn}>
            {this.props.register ? t('string_scan_barcode_to_register') : t('string_scan_barcode_to_signin')}
          </div>
          {!edgeUsername ? (
            <div>
              <div style={style.barCode}>
                <a href={this.renderLoginLink()}>{this.renderBarcode()}</a>
              </div>
              <div style={style.dividerContainer}>
                <label style={style.divider}>or</label>
              </div>
            </div>
            ) : (
            <div>
              <b>{edgeUsername}</b><br />
              {t('approving_login_text')}<br />
            </div>)}
        </div>
      </div>
    )
  }
}

const style = {

  container: {
    marginBottom: '10px',
    display: 'flex',
    flex: 1,
    alignItems: 'stretch',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
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
    paddingTop: '20px',
    margin: '0px auto',
    height: '128px',
    textAlign: 'center'
  }
}

LoginEdge = withRouter(LoginEdge)
export default connect(state => ({
  edgeId: state.login.edgeLoginResults.id,
  edgeUsername: state.login.edgeUsername,
  edgeAccount: state.login.edgeAccount
}))(LoginEdge)
