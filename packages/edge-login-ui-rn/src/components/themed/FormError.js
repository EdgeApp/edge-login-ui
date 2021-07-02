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
  title?: string,
  isWarning?: Boolean,
  marginRem?: number[] | number,
  numberOfLines?: number,
  titleNumberOfLines?: number
}

const FormErrorComponent = ({
  children,
  theme,
  marginRem,
  title,
  numberOfLines,
  titleNumberOfLines,
  isWarning
}: OwnProps & ThemeProps) => {
  const styles = getStyles(theme)
  const spacings = sidesToMargin(mapSides(fixSides(marginRem, 0.5), theme.rem))
  const definitiveTitle = title || children
  const description = definitiveTitle && !title ? '' : children

  if (!definitiveTitle) return null

  return (
    <View
      style={[styles.container, spacings, isWarning && styles.warningContainer]}
    >
      <View style={styles.top}>
        <SimpleLineIcons
          name="info"
          size={theme.rem(1.1)}
          color={isWarning ? theme.warningText : theme.dangerText}
        />
        <EdgeText
          style={[styles.text, styles.title, isWarning && styles.warningText]}
          numberOfLines={titleNumberOfLines}
        >
          {definitiveTitle}
        </EdgeText>
      </View>
      {!!description && (
        <EdgeText
          style={[
            styles.text,
            styles.description,
            isWarning && styles.warningText
          ]}
          numberOfLines={numberOfLines}
        >
          {description}
        </EdgeText>
      )}
    </View>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    borderWidth: 0.25,
    borderRadius: theme.rem(0.25),
    borderColor: theme.dangerText,
    padding: theme.rem(1),
    alignItems: 'flex-start'
  },
  warningContainer: {
    borderColor: theme.warningText
  },
  top: {
    flexDirection: 'row'
  },
  title: {
    fontFamily: theme.fontFaceBold,
    marginLeft: theme.rem(0.75)
  },
  description: {
    marginTop: theme.rem(0.25)
  },
  warningText: {
    color: theme.warningText
  },
  text: {
    flexShrink: 1,
    color: theme.dangerText,
    fontFamily: theme.fontFaceDefault,
    fontSize: theme.rem(0.75)
  }
}))

export const FormError = withTheme(FormErrorComponent)
