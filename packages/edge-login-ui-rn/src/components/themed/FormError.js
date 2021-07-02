// @flow

import * as React from 'react'
import { View } from 'react-native'
import { cacheStyles } from 'react-native-patina'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import { fixSides, mapSides, sidesToMargin } from '../../util/sides'
import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../services/ThemeContext'
import { EdgeText } from './EdgeText'

type OwnProps = {
  children: React.Node,
  marginRem?: number[] | number
}

const FormErrorComponent = ({
  children,
  theme,
  marginRem,
  ...props
}: OwnProps & ThemeProps) => {
  const { container, text } = getStyles(theme)
  const spacings = sidesToMargin(mapSides(fixSides(marginRem, 0.5), theme.rem))

  if (!children) return null

  return (
    <View style={[container, spacings]}>
      <SimpleLineIcons
        name="info"
        size={theme.rem(1.1)}
        color={theme.dangerText}
      />
      <EdgeText style={text} {...props}>
        {children}
      </EdgeText>
    </View>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    borderWidth: 0.25,
    borderRadius: theme.rem(0.25),
    borderColor: theme.dangerText,
    padding: theme.rem(1),
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    flexShrink: 1,
    color: theme.dangerText,
    fontFamily: theme.fontFaceDefault,
    fontSize: theme.rem(0.75),
    marginLeft: theme.rem(0.75)
  }
}))

export const FormError = withTheme(FormErrorComponent)
