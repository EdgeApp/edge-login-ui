import React, { Component } from 'react'
import JsBarcode from 'jsbarcode'
import { connect } from 'react-redux'
import { edgeLogin } from './Login.middleware'
import t from 'lib/web/LocaleStrings'
import logo from '../../img/logo_icon.png'
import { Button } from 'react-toolbox/lib/button'
const { string, func } = React.PropTypes


class LoginWithAirbitz extends Component {
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

  componentWillReceiveProps (nextProps) {
    const { edgeId } = nextProps
    if (edgeId) {
      this.renderBarcode(edgeId)
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

  renderBarcode (id) {
    JsBarcode('#barcode', id, {
      format: 'CODE128A',
      lineColor: '#333333',
      width: 6,
      height: 140,
      fontSize: 36,
      displayValue: true
    })
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
            <Button href={this.renderLoginLink()} target='_blank' raised primary>
              <img src={logo} style={style.logoIcon}/>
              {this.props.register ? t('string_scan_barcode_to_register') : t('string_scan_barcode_to_signin')}
            </Button>
          </div>
          {!edgeUsername ? (
            <div style={style.barCode}>
              <img id="barcode" style={{'width': '240px'}} />
              <div style={style.dividerContainer}>
                <label style={style.divider}>or</label>
              </div>
            </div>) : (
            <div>
              Initiating Login for user<br />
              <b>{edgeUsername}</b><br />
              <span />
            </div>)}
        </div>
      </div>
    )
  }
}

const style = {

  container: {
    width: 700,
    margin: '20px auto',
    display: 'flex',
    alignContent: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  logoIcon: {
    'width': '28px',
    'padding': '4px',
    'verticalAlign': 'top'
  },
  dividerContainer: {
    textAlign: 'center',
    margin: '10px 0'
  },
  divider: {
    display: 'inline-block',
    maxWidth: '100%',
    marginBottom: 5,
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  barCode: {
    width: 240,
    paddingTop: 20
  }
}

export default connect(state => ({
  edgeId: state.login.edgeLoginResults.id,
  edgeUsername: state.login.edgeUsername,
  edgeAccount: state.login.edgeAccount
}))(LoginWithAirbitz)
