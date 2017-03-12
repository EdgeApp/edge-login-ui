import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'react-toolbox/lib/dialog'
import FontIcon from 'react-toolbox/lib/font_icon';
import { selectUserToLogin, setCachedUsers } from './CachedUsers/CachedUsers.action'

import Loader from './Loader/Loader.web'
import ErrorModal from './ErrorModal/ErrorModal.web'
import WarningModal from './WarningModal/WarningModal.web'
import abcctx from 'lib/web/abcContext'
import LayoutTemplate from './LayoutTemplate/LayoutTemplate.web'
import layoutTheme from 'theme/layoutTheme'
import { openLogin, closeUserList } from './Login/Login.action'

import styles from './Container.style.scss'

class Container extends Component {

  _handleToggle = () => {
    if(this.props.edgeObject) {
      this.props.edgeObject.cancelRequest()
    }
    if (window.parent.exitCallback) {
      window.parent.exitCallback()
    }
  }
  loadData () {
     
    const dispatch = this.props.dispatch
    abcctx(ctx => {
      const cachedUsers = ctx.listUsernames()
      console.log('in loadData in container.web.js, cachedUsers is: ' , cachedUsers)
      for (var index in cachedUsers) {
        console.log('this user index: ', index, ' and the user is: ', cachedUsers[index])
        let enabled = ctx.pinLoginEnabled(cachedUsers[index])
        console.log('thie enabled is: ', enabled)
        if(enabled === false) {
          cachedUsers.splice(index, 1)
        }
      }
      console.log('after the loop, cachedUsers is: ', cachedUsers)
      const lastUser = window.localStorage.getItem('lastUser')
      dispatch(setCachedUsers(cachedUsers))
      if (lastUser && cachedUsers.includes(lastUser)) {
        dispatch(selectUserToLogin(lastUser))
      } else {
        dispatch(openLogin())
      }
    })
  }

  componentWillMount () {
    console.log('within componentWillMount')
    this.loadData()
  } 

  render () {   
    console.log('in render')
    return (
      <div className='app'>
        <Dialog
          active
          onEscKeyDown={this._handleToggle}
          onOverlayClick={this._handleToggle}
          className={styles.topLevelDialog}
        >
          <LayoutTemplate theme={layoutTheme}>
            <FontIcon value='clear' className={styles.exitTooltip} onClick={this._handleToggle}/>
            {this.props.children}
          </LayoutTemplate>

          <Loader />
          <ErrorModal />
          <WarningModal />
        </Dialog>
      </div>
    )
  }
}


export default connect(state => ({

  loader: state.loader,
  edgeObject: state.login.edgeLoginResults

}))(Container)


export const getCachedUsers = (callback) => {
  console.log('within getCachedusers, beginning')
  return (imports) => {
    const t = imports.t
    const abcContext = imports.abcContext
    const localStorage = global ? global.localStorage : window.localStorage
    console.log('within getCachedusers and abcContext is: ', abcContext)
    let value = abcContext.listUsernames()
    console.log('abcContext.listUsernames return value is: ' , value)
    /*setTimeout(() => {
      abcContext(context => {
        context.listUsernames(username, password, null, null, (error, account) => {
          if (error) {
            console.log('there is an error: ', error)
            return callback(error, null)
          }
          if (!error) {

          }
        })
      })
    }, 300)*/
  }
} 