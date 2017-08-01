/* eslint-disable global-require */
/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../rootReducer'
import thunk from 'redux-thunk'
import abcContext from './abcContext'
import t from './LocaleStrings'

let middleware = [thunk.withExtraArgument({ t, abcContext })]

if (__DEV__) {
  const createLogger = require('redux-logger')
  const logger = createLogger({ collapsed: true })
  middleware = [...middleware, logger]
} else {
  middleware = [...middleware]
}

export default function configureStore (initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  )
}
