// @flow

import * as React from 'react'
import { Provider } from 'react-redux'
import { type Store, applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import { type RootState, rootReducer } from '../../reducers/RootReducer.js'
import { type Action, type Imports } from '../../types/ReduxTypes.js'

type Props = {
  children?: React.Node,
  imports: Imports
}

/**
 * Consolidates our Redux setup logic into one place.
 */
export class ReduxStore extends React.Component<Props> {
  store: Store<RootState, Action>

  constructor(props: Props) {
    super(props)
    const { imports } = this.props

    const composeEnhancers =
      typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'login-ui' })
        : compose

    this.store = createStore(
      rootReducer,
      undefined,
      composeEnhancers(applyMiddleware(thunk.withExtraArgument(imports)))
    )
  }

  render() {
    const { children } = this.props
    return <Provider store={this.store}>{children}</Provider>
  }
}
