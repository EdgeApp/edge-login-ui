import React, {Component} from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import config from '../../config.json'
const socketAddress = config.socket

import * as action from './action'

class ServerMaintenance extends Component {

	componentDidMount () {
		const authorization = sessionStorage.getItem('header')
		const socket = io(`${socketAddress}?authHeader=${authorization}`)

		socket.on('game-info', (data) => this.props.dispatch(action.socketGameInfo(data)))
		socket.on('players-list', (data) => this.props.dispatch(action.socketPlayerList(data)))
		socket.on('game-history', (data) => this.props.dispatch(action.socketGameFinished(data)))
	}

    render() { return null }
}

export default connect() (ServerMaintenance)
