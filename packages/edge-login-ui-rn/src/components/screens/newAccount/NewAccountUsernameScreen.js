// @flow

import * as React from 'react'
import { View } from 'react-native'
import { cacheStyles } from 'react-native-patina'
import { sprintf } from 'sprintf-js'

import {
  checkUsernameForAvailabilty,
  validateUsername
} from '../../../actions/CreateAccountActions.js'
import s from '../../../common/locales/strings.js'
import { type Branding } from '../../../types/Branding.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { useState } from '../../../util/hooks'
import { connect } from '../../services/ReduxStore.js'
import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../../services/ThemeContext'
import { BackButton } from '../../themed/BackButton'
import { EdgeText } from '../../themed/EdgeText'
import { EdgeTextFieldOutlined } from '../../themed/EdgeTextFieldOutlined'
import { FormError } from '../../themed/FormError'
import { SimpleSceneHeader } from '../../themed/SimpleSceneHeader'
import { SecondaryButton } from '../../themed/ThemedButtons'
import { ThemedScene } from '../../themed/ThemedScene'

type OwnProps = {
  branding: Branding
}
type StateProps = {
  username: string,
  usernameErrorMessage: string | null
}
type DispatchProps = {
  checkUsernameForAvailabilty(string): Promise<void>,
  validateUsername(username: string): void,
  onBack(): void
}
type Props = OwnProps & StateProps & DispatchProps & ThemeProps

const NewAccountUsernameScreenComponent = ({
  theme,
  onBack,
  branding,
  username,
  usernameErrorMessage,
  checkUsernameForAvailabilty,
  validateUsername
}: Props) => {
  const styles = getStyles(theme)
  const [
    isCheckAvailabiltyPending,
    setCheckAvailabiltyPending
  ] = useState<boolean>(false)

  const handleNext = async () => {
    if (usernameErrorMessage || !username) {
      return
    }

    setCheckAvailabiltyPending(true)
    await checkUsernameForAvailabilty(username)
    setCheckAvailabiltyPending(false)
  }

  return (
    <ThemedScene paddingRem={[0.5, 0, 0.5, 0.5]}>
      <BackButton onPress={onBack} marginRem={[0, 0, 1, 0.5]} />
      <SimpleSceneHeader>{s.strings.create_your_account}</SimpleSceneHeader>
      <View style={styles.content}>
        <EdgeText
          style={styles.subtitle}
        >{`${s.strings.step_one}: ${s.strings.choose_title_username}`}</EdgeText>
        <EdgeText style={styles.description} numberOfLines={2}>
          {sprintf(
            s.strings.username_desc,
            branding.appName || s.strings.app_name_default
          )}
        </EdgeText>
        <EdgeTextFieldOutlined
          autoCorrect={false}
          autoFocus
          label={s.strings.username}
          onChangeText={validateUsername}
          onSubmitEditing={handleNext}
          placeholeder={s.strings.choose_username_input_placeholder}
          returnKeyType="go"
          value={username}
          isClearable
          showSearchIcon={false}
          marginRem={0}
        />
        <FormError marginRem={[1, 0]}>{usernameErrorMessage}</FormError>
        <View style={styles.actions}>
          <SecondaryButton
            label={s.strings.next_label}
            onPress={() => {
              handleNext()
            }}
            spinner={isCheckAvailabiltyPending}
          />
        </View>
      </View>
    </ThemedScene>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  content: {
    flex: 1,
    marginHorizontal: theme.rem(0.5)
  },
  subtitle: {
    fontFamily: theme.fontFaceBold,
    color: theme.secondaryText,
    fontSize: theme.rem(1),
    marginBottom: theme.rem(2.25)
  },
  description: {
    fontFamily: theme.fontFaceDefault,
    fontSize: theme.rem(0.875),
    marginBottom: theme.rem(3.25)
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.rem(5)
  }
}))

export const NewAccountUsernameScreen = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  (state: RootState) => ({
    username: state.create.username || '',
    usernameErrorMessage: state.create.usernameErrorMessage
  }),
  (dispatch: Dispatch) => ({
    onBack() {
      dispatch({ type: 'WORKFLOW_BACK' })
    },
    checkUsernameForAvailabilty(data: string) {
      return dispatch(checkUsernameForAvailabilty(data))
    },
    validateUsername(username: string): void {
      dispatch(validateUsername(username))
    }
  })
)(withTheme(NewAccountUsernameScreenComponent))
