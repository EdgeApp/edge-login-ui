// @flow

import * as React from 'react'
import { View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import s from '../../../common/locales/strings'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes'
import { logEvent } from '../../../util/analytics'
import { useState } from '../../../util/hooks'
import { connect } from '../../services/ReduxStore'
import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../../services/ThemeContext'
import { AccountInfo } from '../../themed/AccountInfo'
import { EdgeText } from '../../themed/EdgeText'
import { Fade } from '../../themed/Fade'
import { FormError } from '../../themed/FormError'
import { SimpleSceneHeader } from '../../themed/SimpleSceneHeader'
import { SecondaryButton } from '../../themed/ThemedButtons'
import { ThemedScene } from '../../themed/ThemedScene'

type OwnProps = {}

type DispatchProps = {
  onDone(): void
}

type Props = OwnProps & DispatchProps & ThemeProps

const NewAccountReviewScreenComponent = ({ onDone, theme }: Props) => {
  const [showNext, setShowNext] = useState(false)
  const styles = getStyles(theme)

  const handleNext = () => {
    logEvent(`Signup_Review_Next`)
    onDone()
  }

  return (
    <ThemedScene paddingRem={[0.5, 0, 0.5, 0.5]}>
      <SimpleSceneHeader>{s.strings.account_confirmation}</SimpleSceneHeader>
      <View style={styles.content}>
        <EdgeText
          style={styles.subtitle}
        >{`${s.strings.review}: ${s.strings.write_it_down}`}</EdgeText>
        <EdgeText style={styles.description} numberOfLines={2}>
          {s.strings.almost_done}
        </EdgeText>
        <FormError
          marginRem={[0, 0, 2]}
          title={s.strings.write_and_store}
          numberOfLines={2}
          isWarning
        >
          {s.strings.warning_message}
        </FormError>
        <AccountInfo marginRem={[0, 2.5]} onOpen={() => setShowNext(true)} />
        <View style={styles.actions}>
          <Fade visible={showNext}>
            <SecondaryButton
              label={s.strings.next_label}
              onPress={handleNext}
              straight
              bold
            />
          </Fade>
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
    marginBottom: theme.rem(2)
  },
  description: {
    fontFamily: theme.fontFaceDefault,
    fontSize: theme.rem(0.875),
    marginBottom: theme.rem(2)
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.rem(5)
  }
}))

export const NewAccountReviewScreen = connect<{}, DispatchProps, OwnProps>(
  (state: RootState) => ({}),
  (dispatch: Dispatch) => ({
    onDone() {
      dispatch({ type: 'WORKFLOW_NEXT' })
    }
  })
)(withTheme(NewAccountReviewScreenComponent))
