import React from 'react'
import 'react-toolbox/lib/commons.scss'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import createStore from './lib/web/configureStore'
import Router from './routes.js'

const store = createStore()
const rootElement = document.getElementById('app')

String.format = function (format) {
  const args = Array.prototype.slice.call(arguments, 1)
  return format.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] !== 'undefined'
      ? args[number]
      : match
  })
}

render((
  <Provider store={store}>
    <Router />
  </Provider>
), rootElement)
