import React, { Component } from 'react'
import { connect } from 'react-redux'

import { selectUserToLogin, selectUserToDeleteFromUserCache } from './CachedUsers.action'
import { openWarningModal } from '../WarningModal/WarningModal.action'
import t from 'lib/web/LocaleStrings'
import { openUserList, closeUserList } from '../Login/Login.action'
import _ from 'lodash'
import Button from 'react-toolbox/lib/button'

import cachedUserXButton from 'theme/cachedUserXButton.scss'

import cachedUserButton from 'theme/cachedUserButton.scss'

class UserList extends Component {

  handleLoginUserPin = (user) => {
    this.props.blurField.focus()
    this.props.dispatch(selectUserToLogin(user))
  }

  handleDeleteUserCache = (user) => {
    this.props.blurField.blur()
    this.props.dispatch(selectUserToDeleteFromUserCache(user))
    this.props.dispatch(
      openWarningModal(
        'deleteCachedUser',
        t('fragment_landing_account_delete_title'),
        String.format(t('fragment_landing_account_delete_message'), user)
      )
    )
  }

  listUsers = () => {
    const checkIfLastElementStyle = index => {
      const lastIndex = this.props.users.length - 1
      let styleArr = _.clone(style.row)
      if (index === 0) {
        _.extend(styleArr, style.border)
        _.extend(styleArr, style.topRadius)
      } else if (lastIndex === index) {
        _.extend(styleArr, style.border)
        _.extend(styleArr, style.bottomRadius)
      } else if (lastIndex !== index) {
        _.extend(styleArr, style.border)
      }
      return styleArr
    }

    return this.props.users.map((user, index) => {
      return (
        <div key={index} style={checkIfLastElementStyle(index)}>
          <div style={style.cachedItem}>
            <Button theme={cachedUserButton} style={style.textContainer} onClick={() => this.handleLoginUserPin(user)}>
              { user }
            </Button>
            <Button theme={cachedUserXButton} onClick={() => this.handleDeleteUserCache(user)} color='#222222' style={style.xbutton}>
              X
            </Button >
          </div>
        </div>
      )
    })
  }

  showCachedUsers = () => {
    this.props.dispatch(openUserList())
  }

  hideCachedUsers = () => {
    this.props.dispatch(closeUserList())
  }
  render () {
    return (

      <div
        style={style.container}>
        <div style={style.spacer} />
        <div style={style.listContainer}>
          { this.listUsers() }
        </div>
        <div style={style.spacer} />
      </div>
    )
  }
}

const style = {

  container: {
    position: 'absolute',
    zIndex: 2,
    overflow: 'auto',
    maxHeight: '140px',
    backgroundColor: '#FFF',
    left: 0,
    right: 0,
    top: '50px',
    flex: 1,
    alignSelf: 'flex-end'
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  spacer: {
    flexBasis: '15%',
    display: 'flex'
  },
  listContainer: {
    display: 'flex',
    flexBasis: '70%',
    flexDirection: 'column'
  },
  topRadius: {
    borderWidth: '1px 1px 1px 1px',
    borderRadius: '4px 4px 0px 0px'
  },
  bottomRadius: {
    borderWidth: '0px 1px 1px 1px',
    borderRadius: '0px 0px 4px 4px'
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '10px',
    alignItems: 'stretch',
    height: '40px',
    backgroundColor: '#FFF'
  },
  textContainer: {
    textTransform: 'none',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: '18px',
    padding: 0
  },
  text: {
    display: 'flex',
    flex: 1,
    color: '#222',
    fontSize: '18px'
  },

  xbutton: {
    padding: 0,
    fontSize: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px'
  },

  border: {
    borderWidth: '0px 1px 1px 1px',
    borderColor: '#AAA',
    borderStyle: 'solid'
  },

  cachedItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}

export default connect(state => ({

  users: state.cachedUsers.users,
  showCachedUsers: state.login.showCachedUsers

}))(UserList)
