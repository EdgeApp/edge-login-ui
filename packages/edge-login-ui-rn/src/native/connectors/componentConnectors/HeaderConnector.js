// @flow

import { connect } from 'react-redux'

import * as actions from '../../../common/actions'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { Header } from '../../components/common/'

export const mapStateToProps = (state: State) => {
  const workflow = state.workflow
  const currentWorkflow = workflow[state.workflow.currentKey]
  const currentScene = currentWorkflow.details[state.workflow.currentSceneIndex]
  return {
    showBackButton: currentScene.back,
    showSkipButton: currentScene.skip,
    title: currentScene.title,
    subTitle: currentScene.subTitle
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    goBack: () => dispatch(actions.goBack())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
