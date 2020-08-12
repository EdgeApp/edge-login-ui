// @flow

import { connect } from 'react-redux'

import { Header } from '../../components/common/Header.js'
import { workflows } from '../../constants/workflows.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'

const mapStateToProps = (state: RootState) => {
  const { currentKey, currentSceneIndex } = state.workflow
  const currentScene = workflows[currentKey][currentSceneIndex]
  return {
    showBackButton: currentScene.back,
    showSkipButton: currentScene.skip,
    title: currentScene.title,
    subTitle: currentScene.subTitle
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    goBack: () => dispatch({ type: 'WORKFLOW_BACK' })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
