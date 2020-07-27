// @flow

import { connect } from 'react-redux'

import * as Constants from '../../../common/constants'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes'
import { Header } from '../../components/common/'

const mapStateToProps = (state: RootState) => {
  const workflow = state.workflow
  const currentWorkflow = workflow[state.workflow.currentKey]
  const currentScene = currentWorkflow.details[state.workflow.currentSceneIndex]
  return {
    showBackButton: currentScene.back,
    showSkipButton: currentScene.skip,
    title: currentScene.title,
    subTitle: currentScene.subTitle,
    useCancel: true
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    goBack: () =>
      dispatch({ type: 'WORKFLOW_START', data: Constants.WORKFLOW_PASSWORD })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
