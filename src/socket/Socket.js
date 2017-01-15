import React, {Component} from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import config from '../../config.json'
const socketAddress = config.socket

import * as action from './Socket.action'

class ServerMaintenance extends Component {

  componentDidMount () {
    const authorization = sessionStorage.getItem('header')
    const socket = io(`${socketAddress}?authHeader=${authorization}`)
    socket.on('app-info', (data) => this.props.dispatch(action.socketAppInfo(data)))

    socket.on('history', (data) => this.props.dispatch(action.socketHistory(data)))
  }

    render() { return null }
}

export default connect() (ServerMaintenance)
