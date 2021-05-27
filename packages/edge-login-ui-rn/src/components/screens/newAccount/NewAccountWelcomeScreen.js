// @flow

import * as React from 'react'
import { Image, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'
import { sprintf } from 'sprintf-js'

import { LOGO_BIG, WELCOME_LOCK, WELCOME_SHIELD_KEY } from '../../../assets'
import s from '../../../common/locales/strings.js'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { type Branding } from '../../../types/Branding.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { logEvent } from '../../../util/analytics.js'
import { connect } from '../../services/ReduxStore.js'
import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../../services/ThemeContext'
import { EdgeText } from '../../themed/EdgeText'
import { SimpleSceneHeader } from '../../themed/SimpleSceneHeader'
import { SecondaryButton } from '../../themed/ThemedButtons'
import { ThemedScene } from '../../themed/ThemedScene'

type OwnProps = {
  branding: Branding
}
type DispatchProps = {
  onDone(): void
}
type Props = OwnProps & DispatchProps & ThemeProps

const NewAccountWelcomeScreenComponent = ({
  theme,
  branding,
  onDone
}: Props) => {
  const styles = getStyles(theme)
  const appName = branding.appName || s.strings.app_name_default

  return (
    <ThemedScene>
      <SimpleSceneHeader>{s.strings.get_started}</SimpleSceneHeader>
      <View style={styles.content}>
        <Image source={LOGO_BIG} style={styles.logo} resizeMode="contain" />
        <EdgeText style={styles.welcome}>
          {sprintf(s.strings.welcome, appName)}
        </EdgeText>
        <View style={styles.advantage}>
          <Image
            source={WELCOME_LOCK}
            style={styles.advantageImage}
            resizeMode="contain"
          />
          <View style={styles.advantageTextContainer}>
            <EdgeText style={styles.advantageTitle}>
              {sprintf(s.strings.welcome_advantage_one_title, appName)}
            </EdgeText>
            <EdgeText style={styles.advantageDescription}>
              {s.strings.welcome_advantage_one_description_1}
            </EdgeText>
            <EdgeText style={styles.advantageDescription}>
              {s.strings.welcome_advantage_one_description_2}
            </EdgeText>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.advantage}>
          <Image
            source={WELCOME_SHIELD_KEY}
            style={styles.advantageImage}
            resizeMode="contain"
          />
          <View style={styles.advantageTextContainer}>
            <EdgeText style={styles.advantageTitle}>
              {s.strings.welcome_advantage_two_title}
            </EdgeText>
            <EdgeText style={styles.advantageDescription}>
              {sprintf(s.strings.welcome_advantage_two_description_1, appName)}
            </EdgeText>
            <EdgeText style={styles.advantageDescription}>
              {s.strings.welcome_advantage_two_description_2}
            </EdgeText>
            <EdgeText style={styles.advantageDescription}>
              {s.strings.welcome_advantage_two_description_3}
            </EdgeText>
          </View>
        </View>
        <View style={styles.actions}>
          <SecondaryButton
            label={s.strings.get_started}
            onPress={onDone}
            straight
          />
        </View>
      </View>
    </ThemedScene>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  content: {
    flex: 1,
    alignItems: 'center',
    marginLeft: theme.rem(0.5)
  },
  logo: {
    height: theme.rem(2.25),
    marginTop: theme.rem(1.75),
    marginBottom: theme.rem(1)
  },
  welcome: {
    fontFamily: theme.fontFaceBold,
    color: theme.secondaryText,
    fontSize: theme.rem(1),
    marginBottom: theme.rem(2.375)
  },
  advantage: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  advantageImage: {
    height: theme.rem(2),
    width: theme.rem(2),
    marginRight: theme.rem(1)
  },
  advantageTextContainer: {
    flex: 1
  },
  advantageTitle: {
    fontFamily: theme.fontFaceBold,
    color: Constants.GRAY_4,
    fontSize: theme.rem(1),
    marginBottom: theme.rem(0.5)
  },
  advantageDescription: {
    fontFamily: theme.fontFaceDefault,
    fontSize: theme.rem(0.75)
  },
  divider: {
    width: '100%',
    borderBottomWidth: theme.thinLineWidth,
    borderBottomColor: theme.lineDivider,
    marginVertical: theme.rem(1.5)
  },
  actions: {
    marginTop: theme.rem(4.5)
  },
  nextButtonUpStyle: Styles.PrimaryButtonUpScaledStyle,
  nextButtonUpTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
  nextButtonDownTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
  nextButtonDownStyle: Styles.PrimaryButtonDownScaledStyle
}))

export const NewAccountWelcomeScreen = connect<{}, DispatchProps, OwnProps>(
  (state: RootState) => ({}),
  (dispatch: Dispatch) => ({
    onDone() {
      logEvent(`Signup_Welcome_Next`)
      dispatch({ type: 'WORKFLOW_NEXT' })
    }
  })
)(withTheme(NewAccountWelcomeScreenComponent))
