/* eslint-disable global-require */
/* eslint-disable no-undef */
import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from '../rootReducer'
import abcContext from './abcContext'
import t from './LocaleStrings'

const logger = createLogger({ collapsed: true })
const middleware = [thunk.withExtraArgument({ t, abcContext, logger })]

export default function configureStore (initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(...middleware))
}
