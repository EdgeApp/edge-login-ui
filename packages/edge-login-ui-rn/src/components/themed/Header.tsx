import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import s from '../../common/locales/strings'
import { fixSides, mapSides, sidesToMargin } from '../../util/sides'
import { Theme, ThemeProps, withTheme } from '../services/ThemeContext'
import { BackButton } from '../themed/BackButton'
import { EdgeText } from './EdgeText'

interface OwnProps {
  topLeft?: {
    type: 'back' | 'skip' | 'help' | 'exit'
    onClick: () => void
  }
  topRight?: { type: 'menu'; onClick: () => void }
  topMiddle?: string | React.ReactNode

  // Margin:
  marginRem?: number | number[]
}

const HeaderComponent = ({
  topLeft,
  topRight,
  topMiddle,
  theme,
  marginRem
}: OwnProps & ThemeProps) => {
  const styles = getStyles(theme)

  function renderLeft() {
    if (topLeft == null) return null

    const { type, onClick } = topLeft
    const text =
      type === 'skip'
        ? s.strings.skip
        : type === 'help'
        ? s.strings.help
        : type === 'exit'
        ? s.strings.exit
        : type === 'back'
        ? s.strings.back
        : ''

    return type === 'back' ? (
      <BackButton onPress={onClick} marginRem={0} />
    ) : (
      <TouchableOpacity onPress={onClick}>
        <EdgeText style={type === 'exit' ? styles.exit : {}}>{text}</EdgeText>
      </TouchableOpacity>
    )
  }

  function renderRight() {
    if (topRight == null) return null

    // Need to import Fontello custom fonts
    const { type, onClick } = topRight

    if (type === 'menu') {
      return (
        <TouchableOpacity onPress={onClick}>
          <MaterialIcons name="menu" size={theme.rem(1.5)} color={theme.icon} />
        </TouchableOpacity>
      )
    }

    return null
  }

  function renderMiddle() {
    if (topMiddle == null) return null
    return typeof topMiddle === 'string' ? (
      <EdgeText style={styles.textMiddle}>{topMiddle}</EdgeText>
    ) : (
      topMiddle
    )
  }

  return (
    <View
      style={[
        styles.container,
        sidesToMargin(mapSides(fixSides(marginRem, 0), theme.rem))
      ]}
    >
      <View style={styles.left}>{renderLeft()}</View>
      <View style={styles.middle}>{renderMiddle()}</View>
      <View style={styles.right}>{renderRight()}</View>
    </View>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    flexDirection: 'row'
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  middle: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  exit: {
    color: theme.linkText
  },
  textMiddle: {
    fontSize: theme.rem(1),
    textAlign: 'center',
    fontFamily: theme.fontFaceBold
  }
}))

export const Header = withTheme(HeaderComponent)
