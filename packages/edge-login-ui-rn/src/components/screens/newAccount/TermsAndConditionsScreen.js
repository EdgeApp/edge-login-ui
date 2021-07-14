// @flow

import * as React from 'react'
import { Linking, ScrollView, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'
import { sprintf } from 'sprintf-js'

import { agreeToConditions } from '../../../actions/CreateAccountActions'
import s from '../../../common/locales/strings'
import { type Branding } from '../../../types/Branding'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes'
import { logEvent } from '../../../util/analytics'
import { useRef, useState } from '../../../util/hooks'
import { connect } from '../../services/ReduxStore'
import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../../services/ThemeContext'
import { BackButton } from '../../themed/BackButton'
import { Checkbox } from '../../themed/Checkbox'
import { EdgeText } from '../../themed/EdgeText'
import { Fade } from '../../themed/Fade'
import { SimpleSceneHeader } from '../../themed/SimpleSceneHeader'
import { SecondaryButton } from '../../themed/ThemedButtons'
import { ThemedScene } from '../../themed/ThemedScene'

type OwnProps = {
  branding: Branding
}

type StateProps = {}

type DispatchProps = {
  agreeToCondition(): void
}

type Props = OwnProps & StateProps & DispatchProps & ThemeProps

const TermsAndConditionsScreenComponent = ({
  branding,
  agreeToCondition,
  theme
}: Props) => {
  const styles = getStyles(theme)
  const scrollViewRef = useRef<ScrollView | null>(null)
  const [termValues, setTermValues] = useState<boolean[]>([
    false,
    false,
    false,
    false
  ])

  const { appName = s.strings.app_name_default } = branding
  const terms: string[] = [
    sprintf(s.strings.terms_one, appName),
    s.strings.terms_two,
    sprintf(s.strings.terms_three, appName),
    sprintf(s.strings.terms_four, appName)
  ]

  if (!termValues.includes(false)) {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true })
      }
    }, 50)
  }

  const handleStatusChange = (index: number, value: boolean) => {
    const newTermValues = [...termValues]
    newTermValues[index] = value
    setTermValues(newTermValues)
  }

  const handleNextPress = () => {
    logEvent(`Signup_Terms_Agree`)
    agreeToCondition()
  }

  return (
    <ThemedScene paddingRem={[0.5, 0, 0.5, 0.5]}>
      <BackButton marginRem={[0, 0, 1, 0.5]} disabled />
      <SimpleSceneHeader>{s.strings.account_confirmation}</SimpleSceneHeader>
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.content}>
        <EdgeText
          style={styles.subtitle}
        >{`${s.strings.review}: ${s.strings.read_understod_2}`}</EdgeText>
        <View style={styles.terms}>
          {terms.map((term, index) => (
            <Checkbox
              key={index}
              textStyle={styles.term}
              value={termValues[index]}
              onChange={(value: boolean) => handleStatusChange(index, value)}
              marginRem={[0, 0, 1.33, 0]}
            >
              {term}
            </Checkbox>
          ))}
        </View>
        <EdgeText
          style={styles.agreeText}
          numberOfLines={2}
          onPress={() => Linking.openURL('https://edge.app/terms-of-service/')}
        >
          {s.strings.read_understod_1}
          <EdgeText style={styles.agreeTextLink}>
            {s.strings.read_understod_2}
          </EdgeText>
        </EdgeText>
        <View style={styles.actions}>
          <Fade visible={!termValues.includes(false)}>
            <SecondaryButton
              label={s.strings.confirm_finish}
              onPress={handleNextPress}
              paddingRem={0.7}
            />
          </Fade>
        </View>
      </ScrollView>
    </ThemedScene>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  content: {
    flex: 1,
    marginLeft: theme.rem(0.5),
    marginRight: theme.rem(1)
  },
  subtitle: {
    fontFamily: theme.fontFaceBold,
    color: theme.secondaryText,
    fontSize: theme.rem(1),
    marginBottom: theme.rem(2)
  },
  terms: {},
  term: {
    fontSize: theme.rem(0.875)
  },
  agreeText: {
    width: '60%',
    alignSelf: 'center',
    marginTop: theme.rem(1),
    marginHorizontal: theme.rem(2),
    fontSize: theme.rem(0.875)
  },
  agreeTextLink: {
    fontSize: theme.rem(0.875),
    color: theme.linkText
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.rem(5)
  }
}))

export const TermsAndConditionsScreen = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  (state: RootState) => ({}),
  (dispatch: Dispatch) => ({
    agreeToCondition() {
      dispatch(agreeToConditions())
    }
  })
)(withTheme(TermsAndConditionsScreenComponent))
