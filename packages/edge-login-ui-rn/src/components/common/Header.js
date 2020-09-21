// @flow

import React, { Component } from 'react'
import { Platform, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import s from '../../common/locales/strings.js'
import T from '../../components/common/FormattedText.js'
import { connect } from '../../components/services/ReduxStore.js'
import * as Colors from '../../constants/Colors.js'
import * as Constants from '../../constants/index.js'
import { workflows } from '../../constants/workflows.js'
import * as Styles from '../../styles/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { scale } from '../../util/scaling.js'
import { Button } from '../common/Button.js'
import { HeaderBackButton } from '../common/HeaderBackButton.js'

type OwnProps = {
  onBack?: () => void,
  onSkip?: () => void
}
type StateProps = {
  subTitle: string,
  title: string
}
type Props = OwnProps & StateProps

/**
 * The raw Header for a scene.
 * This is exported because ChangeRecoveryConfirmScreen isn't a real screen,
 * and pulls this in specially.
 */
export class HeaderComponent extends Component<Props> {
  render() {
    const Style = HeaderContainerScaledStyle
    return (
      <LinearGradient
        style={[Style.container, { paddingTop: 0 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={Colors.GRADIENT}
      >
        <View style={Style.left}>{this.renderBack(Style)}</View>
        {this.renderText(Style)}
        <View style={Style.right}>{this.renderSkip(Style)}</View>
      </LinearGradient>
    )
  }

  renderBack(style: typeof HeaderContainerScaledStyle) {
    if (this.props.onBack == null) return null

    return (
      <HeaderBackButton
        onPress={this.props.onBack}
        styles={style.headerBackButtonStyle}
        label={s.strings.back}
      />
    )
  }

  renderText(style: Object) {
    return (
      <View style={style.center}>
        {this.props.subTitle !== '' && (
          <T style={style.subHeadText}>{this.props.subTitle}</T>
        )}
        <T style={style.headlineText}>{this.props.title}</T>
      </View>
    )
  }

  renderSkip(style: Object) {
    if (this.props.onSkip == null) return null

    return (
      <Button
        onPress={this.props.onSkip}
        downStyle={style.textButton.downStyle}
        downTextStyle={style.textButton.downTextStyle}
        upStyle={style.textButton.upStyle}
        upTextStyle={style.textButton.upTextStyle}
        label={s.strings.skip}
      />
    )
  }
}

const HeaderContainerScaledStyle = {
  container: {
    position: 'relative',
    height: scale(Platform.OS === 'ios' ? 42 : 54),
    width: '100%',
    backgroundColor: Constants.TRANSPARENT,
    flexDirection: 'row',
    paddingTop: scale(6)
  },
  headerBackButtonStyle: {
    backButton: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    backIconStyle: {
      position: 'relative',
      top: scale(1),
      paddingLeft: scale(10),
      paddingRight: scale(6),
      color: Constants.WHITE,
      fontSize: scale(20)
    },
    sideText: {
      color: Constants.WHITE,
      fontSize: scale(14)
    },
    icon: {
      color: Constants.WHITE
    },
    default: {
      backgroundColor: Constants.TRANSPARENT,
      color: Constants.WHITE
    }
  },
  left: {
    flex: 1,
    justifyContent: 'center'
  },
  center: {
    flex: 3,
    justifyContent: 'center'
  },
  right: {
    flex: 1,
    justifyContent: 'center'
  },
  headlineText: {
    fontSize: scale(17),
    width: '100%',
    textAlign: 'center',
    color: Constants.WHITE
  },
  subHeadText: {
    fontSize: scale(11),
    width: '100%',
    textAlign: 'center',
    color: Constants.ACCENT_MINT
  },
  textButton: {
    upStyle: { ...Styles.TextOnlyButtonUpScaledStyle, width: '100%' },
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpScaledStyle,
      width: '100%',
      color: Constants.WHITE,
      fontSize: scale(Constants.FONTS.defaultButtonTextSize)
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownScaledStyle,
      width: '100%',
      color: Constants.SECONDARY,
      fontSize: scale(Constants.FONTS.defaultButtonTextSize)
    },
    downStyle: {
      ...Styles.TextOnlyButtonDownScaledStyle,
      width: '100%',
      height: scale(50)
    }
  }
}

export const Header = connect<StateProps, {}, OwnProps>(
  (state: RootState) => {
    const { currentKey, currentSceneIndex } = state.workflow
    const currentScene = workflows[currentKey][currentSceneIndex]
    return {
      subTitle: currentScene.subTitle,
      title: currentScene.title
    }
  },
  (dispatch: Dispatch) => ({})
)(HeaderComponent)
