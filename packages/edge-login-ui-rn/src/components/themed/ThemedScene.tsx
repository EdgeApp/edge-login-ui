import * as React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { cacheStyles } from 'react-native-patina'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import s from '../../common/locales/strings'
import { fixSides, mapSides, sidesToPadding } from '../../util/sides'
import { Theme, useTheme } from '../services/ThemeContext'
import { DividerLine } from './DividerLine'

interface Props {
  children?: React.ReactNode

  // Header:
  noUnderline?: boolean
  onBack?: () => void
  onSkip?: () => void
  title?: string

  // Padding:
  paddingRem?: number | number[]
}

export function ThemedScene(props: Props) {
  const {
    children,
    onBack,
    onSkip,
    paddingRem,
    title,
    noUnderline = false
  } = props
  const theme = useTheme()
  const styles = getStyles(theme)

  const hasHeader = onBack != null || onSkip != null || title != null

  const containerStyle = {
    flex: 1,
    ...sidesToPadding(mapSides(fixSides(paddingRem, 0.5), theme.rem))
  }
  return (
    <>
      <LinearGradient
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[theme.backgroundGradientLeft, theme.backgroundGradientRight]}
      />
      <SafeAreaView style={{ flex: 1 }}>
        {!hasHeader ? null : (
          <View style={styles.headerButtons}>
            {onBack == null ? null : (
              <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <FontAwesome5
                  name="chevron-left"
                  size={theme.rem(1)}
                  color={theme.primaryText}
                />
              </TouchableOpacity>
            )}
            {onSkip == null ? null : (
              <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
                <Text style={styles.skipText}>{s.strings.skip}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {title == null ? null : <Text style={styles.titleText}>{title}</Text>}
        {!hasHeader || noUnderline ? null : (
          <DividerLine marginRem={[1, 1, 0]} />
        )}

        <View style={containerStyle}>{children}</View>
      </SafeAreaView>
    </>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  headerButtons: {
    flexDirection: 'row',
    height: theme.rem(3)
  },
  backButton: {
    justifyContent: 'center',
    paddingHorizontal: theme.rem(1),
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0
  },
  skipButton: {
    justifyContent: 'center',
    paddingHorizontal: theme.rem(1),
    position: 'absolute',
    bottom: 0,
    right: 0,
    top: 0
  },
  skipText: {
    color: theme.primaryText,
    fontFamily: theme.fontFaceDefault,
    fontSize: theme.rem(1)
  },
  titleText: {
    ...theme.headingFont,
    color: theme.primaryText,
    fontSize: theme.rem(1.25),
    marginHorizontal: theme.rem(1)
  }
}))
