// @flow

import * as React from 'react'
import { connect as rawConnect, Provider } from 'react-redux'
import { type Store, applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import { type RootState, rootReducer } from '../../reducers/RootReducer.js'
import {
  type Action,
  type Dispatch,
  type GetState,
  type Imports
} from '../../types/ReduxTypes.js'

type Props = {
  children?: React.Node,
  initialAction:
    | Action
    | ((dispatch: Dispatch, getState: GetState, i: Imports) => mixed),
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
    // $FlowFixMe Flow doesn't know about thunks at this point.
    this.store.dispatch(this.props.initialAction)
  }

  componentDidUpdate(prev: Props) {
    const { recoveryKey } = this.props.imports
    if (recoveryKey && recoveryKey !== prev.imports.recoveryKey) {
      this.store.dispatch({ type: 'SET_RECOVERY_KEY', data: recoveryKey })
    }
  }

  render() {
    const { children } = this.props
    return <Provider store={this.store}>{children}</Provider>
  }
}

type Connector<ExtraProps, OwnProps> = (
  component: React.ComponentType<ExtraProps & OwnProps>
) => React.ComponentType<OwnProps>

/**
 * The react-redux connect function, locked to our own Redux types
 * and fixed to take the same type parameters as the TypeScript version.
 */
export function connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps: (state: RootState, ownProps: OwnProps) => StateProps,
  mapDispatchToProps: (dispatch: Dispatch, ownProps: OwnProps) => DispatchProps
): Connector<StateProps & DispatchProps, OwnProps> {
  // $FlowFixMe
  return rawConnect(mapStateToProps, mapDispatchToProps)
}
