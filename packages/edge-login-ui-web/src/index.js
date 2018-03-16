import './polyfill.js'
import './theme/globals.scss'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import createStore from './lib/web/configureStore'
import Router from './routes.js'

const store = createStore()
const rootElement = document.getElementById('app')

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  rootElement
)
