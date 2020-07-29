// @flow

import { connect } from 'react-redux'

import { cancel } from '../../actions/WorkflowActions.js'
import { Header } from '../../components/common/'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'

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
    goBack: () => dispatch(cancel())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
