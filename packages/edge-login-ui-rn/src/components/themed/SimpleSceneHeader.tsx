import * as React from 'react'
import { View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import { Theme, ThemeProps, withTheme } from '../services/ThemeContext'
import { Divider } from '../themed/Divider'
import { EdgeText } from '../themed/EdgeText'

interface Props {
  children: React.ReactNode
}

const SimpleSceneHeaderComponent = ({
  children,
  theme
}: Props & ThemeProps) => {
  const styles = getStyles(theme)

  return (
    <View>
      <EdgeText style={styles.text}>{children}</EdgeText>
      <Divider marginRem={[1, 0]} />
    </View>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  text: {
    marginRight: theme.rem(0.5),
    fontSize: theme.rem(1.25),
    fontFamily: theme.fontFaceMedium
  }
}))

export const SimpleSceneHeader = withTheme(SimpleSceneHeaderComponent)
