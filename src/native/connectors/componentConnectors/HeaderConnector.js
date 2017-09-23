import { connect } from 'react-redux'
import { Header } from '../../components/common/'
import * as actions from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  const workflow = state.workflow
  const currentWorkflow = workflow[state.workflow.currentKey]
  const currentScene = currentWorkflow.details[state.workflow.currentSceneIndex]
  return {
    style: ownProps.style,
    showBackButton: currentScene.back,
    showSkipButton: currentScene.skip,
    title: currentScene.title,
    subTitle: currentScene.subTitle
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    goBack: () => dispatch(actions.goBack()),
    skipScreen: () => dispatch(actions.skipStep())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
