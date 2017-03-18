/* eslint-disable global-require */
/* eslint-disable no-undef */
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../rootReducer'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import abcContext from './abcContext'
import t from './LocaleStrings'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = createLogger({ collapsed: true })
const middleware = [thunk.withExtraArgument({ t, abcContext, logger })]

export default function configureStore (initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
    )
}
