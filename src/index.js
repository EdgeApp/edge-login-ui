import React from 'react'
import { render } from 'react-dom'
import thunk from 'redux-thunk'
import reducer from './combinedReducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, IndexRedirect, Route, browserHistory } from 'react-router'

import { UserAuthWrapper } from 'redux-auth-wrapper'
import { authenticate } from './app/User/middleware/middleware'

import Container from './app/Container'
import Player from './app/Content/Player/Player'
import Admin from './app/Content/Admin/Admin'
import Login from './app/User/Login'
import GameHistory from './app/Content/GameHistory/GameHistory'
import BetHistory from './app/Content/BetHistory/BetHistory'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(reducer)
const rootElement = document.getElementById('app')

const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.user.profile,
    redirectAction: authenticate,
    wrapperDisplayName: 'UserIsAuthenticated'
})

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={UserIsAuthenticated(Container)}>
                <IndexRedirect to="/player" />
                <Route path="/player" component={Player}/>
                <Route path="/admin" component={Admin}/>
                <Route path="/game-history" component={GameHistory}/>
                <Route path="/bet-history" component={BetHistory}/>
            </Route>
			<Route path="/login" component={Login}/>
        </Router>
    </Provider>
), rootElement)
