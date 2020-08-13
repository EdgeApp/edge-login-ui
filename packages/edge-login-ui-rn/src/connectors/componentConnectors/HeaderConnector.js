// @flow

import { Header } from '../../components/common/Header.js'
import { connect } from '../../components/services/ReduxStore.js'
import { workflows } from '../../constants/workflows.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'

type OwnProps = {
  customLabel?: string,
  skipScreen?: () => void
}
type StateProps = {
  showBackButton: boolean,
  showSkipButton?: boolean,
  title: string,
  subTitle: string,
  useCancel?: boolean
}
type DispatchProps = {
  goBack(): void
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => {
    const { currentKey, currentSceneIndex } = state.workflow
    const currentScene = workflows[currentKey][currentSceneIndex]
    return {
      showBackButton: currentScene.back,
      showSkipButton: currentScene.skip,
      title: currentScene.title,
      subTitle: currentScene.subTitle
    }
  },
  (dispatch: Dispatch) => ({
    goBack() {
      dispatch({ type: 'WORKFLOW_BACK' })
    }
  })
)(Header)
