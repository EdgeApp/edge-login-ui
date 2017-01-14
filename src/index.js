import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import createStore from './lib/configureStore'
import Router from './routes'

const store = createStore()
const rootElement = document.getElementById('app')

render((
    <Provider store={store}>
		<Router />
    </Provider>
), rootElement)
