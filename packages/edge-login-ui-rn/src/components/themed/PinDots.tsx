import { wrap } from 'cavy'
import * as React from 'react'
import { View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import { Theme, useTheme } from '../services/ThemeContext'

interface Props {
  pinLength: number
  maxLength: number
}

const PinDotsComponent = ({ maxLength, pinLength }: Props) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      {[...new Array(maxLength)].map((_, index) => (
        <View
          key={index}
          style={[styles.circle, pinLength > index && styles.circleFilled]}
        />
      ))}
    </View>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  circle: {
    borderWidth: theme.mediumLineWidth,
    borderColor: theme.primaryButton,
    borderRadius: theme.rem(1),
    height: theme.rem(2),
    width: theme.rem(2)
  },
  circleFilled: {
    backgroundColor: theme.primaryButton
  }
}))

export const PinDots = wrap(PinDotsComponent)
