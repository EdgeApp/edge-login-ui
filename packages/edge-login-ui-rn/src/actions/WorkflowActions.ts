import { Dispatch, GetState, Imports } from '../types/ReduxTypes'

export const onComplete = () => (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
) => {
  imports.onComplete()
}
