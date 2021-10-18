import * as React from 'react'
import { ScrollView, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import { confirmAndFinish } from '../../../actions/CreateAccountActions'
import s from '../../../common/locales/strings'
import { createAccountPaddings } from '../../../constants/themedScenePaddings'
import { useScrollToEnd } from '../../../hooks/useScrollToEnd'
import { Dispatch, RootState } from '../../../types/ReduxTypes'
import { logEvent } from '../../../util/analytics'
import { connect } from '../../services/ReduxStore'
import { Theme, ThemeProps, withTheme } from '../../services/ThemeContext'
import { AccountInfo } from '../../themed/AccountInfo'
import { EdgeText } from '../../themed/EdgeText'
import { Fade } from '../../themed/Fade'
import { FormError } from '../../themed/FormError'
import { SecondaryButton } from '../../themed/ThemedButtons'
import { ThemedScene } from '../../themed/ThemedScene'

interface OwnProps {}

interface DispatchProps {
  onDone: () => void
}

type Props = OwnProps & DispatchProps & ThemeProps

const NewAccountReviewSceneComponent = ({ onDone, theme }: Props) => {
  const styles = getStyles(theme)
  const { paddingRem, innerPaddingRem } = createAccountPaddings

  const [showNext, setShowNext] = React.useState(false)
  const scrollViewRef = useScrollToEnd(showNext)

  const handleNext = () => {
    logEvent(`Signup_Review_Done`)
    onDone()
  }

  return (
    <ThemedScene
      titleText={s.strings.review}
      paddingRem={paddingRem}
      innerPaddingRem={innerPaddingRem}
      showHeader
    >
      <ScrollView ref={scrollViewRef}>
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
            />
          </Fade>
        </View>
      </ScrollView>
    </ThemedScene>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  description: {
    marginBottom: theme.rem(2)
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.rem(5),
    minHeight: theme.rem(3)
  }
}))

export const NewAccountReviewScene = connect<{}, DispatchProps, OwnProps>(
  (state: RootState) => ({}),
  (dispatch: Dispatch) => ({
    onDone() {
      dispatch(confirmAndFinish())
    }
  })
)(withTheme(NewAccountReviewSceneComponent))
