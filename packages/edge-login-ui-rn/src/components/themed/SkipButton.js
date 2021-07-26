// @flow

import * as React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import s from '../../common/locales/strings.js'
import { fixSides, mapSides, sidesToMargin } from '../../util/sides'
import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../services/ThemeContext'
import { EdgeText } from '../themed/EdgeText'

type Props = {
  onPress?: () => void,
  marginRem?: number[] | number,
  disabled?: boolean
}

const SkipButtonComponent = ({
  theme,
  marginRem,
  onPress,
  disabled = false
}: Props & ThemeProps) => {
  const styles = getStyles(theme)
  const spacings = sidesToMargin(mapSides(fixSides(marginRem, 0.5), theme.rem))

  return (
    <View style={[spacings, styles.container]}>
      {!disabled && (
        <TouchableWithoutFeedback onPress={onPress}>
          <EdgeText style={styles.text}>{s.strings.skip}</EdgeText>
        </TouchableWithoutFeedback>
      )}
    </View>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: theme.rem(1),
    height: 44 // This is a fixed height of the navigation header no matter what screen size. Default by router-flux
  },
  text: {
    fontFamily: theme.fontFaceBold
  }
}))

export const SkipButton = withTheme(SkipButtonComponent)
