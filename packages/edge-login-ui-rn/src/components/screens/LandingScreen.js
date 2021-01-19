// @flow

import * as React from 'react'
import { Text, View } from 'react-native'

import * as Assets from '../../assets/index.js'
import s from '../../common/locales/strings.js'
import * as Constants from '../../constants/index.js'
import * as Styles from '../../styles/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { scale } from '../../util/scaling.js'
import { LogoImageHeader } from '../abSpecific/LogoImageHeader.js'
import { BackgroundImage } from '../common/BackgroundImage.js'
import { Button } from '../common/Button.js'
import { HeaderParentButtons } from '../common/HeaderParentButtons.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  appId?: string,
  backgroundImage?: any,
  primaryLogo?: any,
  primaryLogoCallback?: () => void,
  parentButton?: Object,
  landingScreenText?: string
}
type DispatchProps = {
  startCreate(): void,
  startPassword(): void
}
type Props = OwnProps & DispatchProps

class LandingScreenComponent extends React.Component<Props> {
  render() {
    return (
      <View style={LandingScreenStyle.container}>
        <BackgroundImage
          src={this.props.backgroundImage || Assets.LOGIN_BACKGROUND}
          style={LandingScreenStyle.backgroundImage}
          content={this.renderOverImage()}
        />
      </View>
    )
  }

  renderOverImage() {
    return (
      <View style={LandingScreenStyle.inner}>
        <HeaderParentButtons
          parentButton={this.props.parentButton}
          appId={this.props.appId}
        />
        <View style={LandingScreenStyle.featureBox}>
          <LogoImageHeader
            src={this.props.primaryLogo}
            callback={this.props.primaryLogoCallback}
          />
          <View style={LandingScreenStyle.featureBoxContent}>
            <View style={LandingScreenStyle.featureBoxDescription}>
              <Text style={LandingScreenStyle.tagText}>
                {this.props.landingScreenText || s.strings.landing_tagline}
              </Text>
            </View>
          </View>
          <View style={LandingScreenStyle.featureBoxButtons}>
            <Button
              onPress={this.props.startCreate}
              label={s.strings.landing_create_account_button}
              downStyle={LandingScreenStyle.createButton.downStyle}
              downTextStyle={LandingScreenStyle.createButton.downTextStyle}
              upStyle={LandingScreenStyle.createButton.upStyle}
              upTextStyle={LandingScreenStyle.createButton.upTextStyle}
            />
            <View style={LandingScreenStyle.shim} />
            <Button
              testID="alreadyHaveAccountButton"
              onPress={this.props.startPassword}
              label={s.strings.landing_already_have_account}
              downStyle={LandingScreenStyle.loginButton.downStyle}
              downTextStyle={LandingScreenStyle.loginButton.downTextStyle}
              upStyle={LandingScreenStyle.loginButton.upStyle}
              upTextStyle={LandingScreenStyle.loginButton.upTextStyle}
            />
          </View>
        </View>
      </View>
    )
  }
}

const LandingScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {
    ...Styles.BackgroundScreenImageStyle,
    alignItems: 'center'
  },
  inner: {
    position: 'relative',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  featureBox: {
    position: 'relative',
    top: scale(71),
    width: '100%',
    height: scale(286)
  },
  featureBoxContent: {
    // height: scale(186), 306- 125 - remaining space.
    width: '100%',
    flexDirection: 'column',
    height: scale(166),
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  featureBoxDescription: {
    // height: scale(186), 306- 125 - remaining space.
    width: '100%',
    justifyContent: 'flex-end'
  },
  featureBoxButtons: {
    // height: scale(186),
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  shim: {
    height: scale(28)
  },
  tagText: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    color: Constants.WHITE,
    backgroundColor: Constants.TRANSPARENT,
    fontFamily: Constants.FONTS.fontFamilyRegular,
    textAlign: 'center',
    fontSize: scale(14),
    lineHeight: scale(18)
  },
  createButton: {
    upStyle: Styles.TertiaryButtonUpStyle,
    upTextStyle: Styles.TertiaryButtonTextUpStyle,
    downTextStyle: Styles.TertiaryButtonTextDownStyle,
    downStyle: Styles.TertiaryButtonDownStyle
  },
  loginButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      fontSize: scale(14),
      color: Constants.WHITE
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      fontSize: scale(14),
      color: Constants.WHITE
    },
    downStyle: Styles.TextOnlyButtonDownStyle
  }
}

export const LandingScreen = connect<{}, DispatchProps, OwnProps>(
  (state: RootState) => ({}),
  (dispatch: Dispatch): DispatchProps => ({
    startCreate() {
      global.firebase &&
        global.firebase.analytics().logEvent('Signup_Create_Account')
      dispatch({ type: 'START_CREATE_ACCOUNT' })
    },
    startPassword() {
      dispatch({ type: 'START_PASSWORD_LOGIN' })
    }
  })
)(LandingScreenComponent)
