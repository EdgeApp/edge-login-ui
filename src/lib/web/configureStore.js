/* eslint-disable global-require */
/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../rootReducer'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import abcContext from './abcContext'
import t from './LocaleStrings'


const logger = createLogger({ collapsed: true })
const middleware = [thunk.withExtraArgument({ t, abcContext, logger })]

export default function configureStore (initialState) {

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
    )
}
