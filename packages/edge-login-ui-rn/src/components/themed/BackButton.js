// @flow

import * as React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import { fixSides, mapSides, sidesToMargin } from '../../util/sides'
import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../services/ThemeContext'

type Props = {
  onPress(): void,
  marginRem?: number[] | number
}

const BackButtonComponent = ({
  theme,
  marginRem,
  onPress
}: Props & ThemeProps) => {
  const styles = getStyles(theme)
  const spacings = sidesToMargin(mapSides(fixSides(marginRem, 0.5), theme.rem))

  return (
    <View style={[spacings, styles.container]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <SimpleLineIcons
          name="arrow-left"
          size={theme.rem(0.8)}
          color={theme.icon}
        />
      </TouchableWithoutFeedback>
    </View>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    width: theme.rem(0.8),
    height: theme.rem(0.8)
  }
}))

export const BackButton = withTheme(BackButtonComponent)
