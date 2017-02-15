import React, { Component } from 'react'
const QRCode = require('qrcode.react');
import { connect } from 'react-redux'
import { edgeLogin } from './Login.middleware'
import t from 'lib/web/LocaleStrings'
import logo from '../../img/logo_icon.png'
import { Button, IconButton } from 'react-toolbox/lib/button'
const { string, func } = React.PropTypes

class LoginEdge extends Component {
  static defaultProps = {
    edgeId: '',
    edgeUsername: '',
    edgeAccount: ''
  }

  static propTypes = {
    edgeId: string,
    edgeUsername: string,
    edgeAccount: string,
    dispatch: func
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { edgeId, dispatch } = this.props

    if (!edgeId) {
      dispatch(edgeLogin(this.handleEdgeLogin, this.handleProcessLogin))
    }
  }


  handleEdgeLogin (error, account) {
    console.log(username)
    if (error) {
      console.log('Error on Edge Login')
    } else {
      console.log(account)
    }
  }

  handleProcessLogin (username) {
    console.log(username)
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
    margin: '20px auto 0px auto',
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
    margin: '0px auto'
  },
  dividerContainer: {
    textAlign: 'center',
    margin: '20px 0 0px 0px'
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

export default connect(state => ({
  edgeId: state.login.edgeLoginResults.id,
  edgeUsername: state.login.edgeUsername,
  edgeAccount: state.login.edgeAccount
}))(LoginEdge)
