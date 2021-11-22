import * as React from 'react'
import { View } from 'react-native'
import { cacheStyles } from 'react-native-patina'
import { sprintf } from 'sprintf-js'

import {
  checkUsernameForAvailabilty,
  validateUsername
} from '../../../actions/CreateAccountActions'
import s from '../../../common/locales/strings'
import { Branding } from '../../../types/Branding'
import { Dispatch, RootState } from '../../../types/ReduxTypes'
import { connect } from '../../services/ReduxStore'
import { Theme, ThemeProps, withTheme } from '../../services/ThemeContext'
import { EdgeText } from '../../themed/EdgeText'
import { EdgeTextFieldOutlined } from '../../themed/EdgeTextFieldOutlined'
import { Fade } from '../../themed/Fade'
import { FormError } from '../../themed/FormError'
import { MainButton } from '../../themed/MainButton'
import { ThemedScene } from '../../themed/ThemedScene'

interface OwnProps {
  branding: Branding
}
interface StateProps {
  username: string
  usernameErrorMessage: string | null
}
interface DispatchProps {
  checkUsernameForAvailabilty: (username: string) => Promise<void>
  validateUsername: (username: string) => void
  onBack: () => void
}
type Props = OwnProps & StateProps & DispatchProps & ThemeProps

const NewAccountUsernameSceneComponent = ({
  theme,
  onBack,
  branding,
  username,
  usernameErrorMessage,
  checkUsernameForAvailabilty,
  validateUsername
}: Props) => {
  const styles = getStyles(theme)

  const handleNext = async () => {
    if (usernameErrorMessage || !username) {
      return
    }
    await checkUsernameForAvailabilty(username)
  }

  return (
    <ThemedScene onBack={onBack} title={s.strings.choose_title_username}>
      <View style={styles.content}>
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
          returnKeyType="go"
          value={username}
          isClearable
          showSearchIcon={false}
          marginRem={[0, 0.75]}
        />
        <FormError
          marginRem={[1, 0.75]}
          invisible={usernameErrorMessage == null}
        >
          {usernameErrorMessage}
        </FormError>
        <Fade
          hidden
          visible={
            username.length > 0 &&
            (usernameErrorMessage == null || usernameErrorMessage === '')
          }
        >
          <MainButton
            alignSelf="center"
            label={s.strings.next_label}
            type="secondary"
            onPress={handleNext}
          />
        </Fade>
      </View>
    </ThemedScene>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  content: {
    flex: 1,
    marginHorizontal: theme.rem(0.5),
    marginTop: theme.rem(1.5)
  },
  description: {
    fontFamily: theme.fontFaceDefault,
    fontSize: theme.rem(0.875),
    marginBottom: theme.rem(3.25)
  }
}))

export const NewAccountUsernameScene = connect<
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
      dispatch({ type: 'NEW_ACCOUNT_WELCOME' })
    },
    async checkUsernameForAvailabilty(data: string) {
      return await dispatch(checkUsernameForAvailabilty(data))
    },
    validateUsername(username: string): void {
      dispatch(validateUsername(username))
    }
  })
)(withTheme(NewAccountUsernameSceneComponent))
