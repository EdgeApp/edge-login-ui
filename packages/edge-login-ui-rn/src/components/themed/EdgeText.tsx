// copied EdgeText component from 'edge-react-gui'

import * as React from 'react'
import { cacheStyles } from 'react-native-patina'

import { Text, TextProps, TextStyle } from '../../types/wrappedReactNative'
import { Theme, ThemeProps, withTheme } from '../services/ThemeContext'

interface OwnProps {
  children: React.ReactNode
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'
  numberOfLines?: number
  style?: TextStyle
  disableFontScaling?: boolean
}

class EdgeTextComponent extends React.PureComponent<
  OwnProps & TextProps & ThemeProps
> {
  render() {
    const {
      children,
      style,
      theme,
      disableFontScaling = false,
      ...props
    } = this.props
    const { text } = getStyles(theme)
    let numberOfLines =
      typeof this.props.numberOfLines === 'number'
        ? this.props.numberOfLines
        : 1
    if (typeof children === 'string' && children.includes('\n')) {
      numberOfLines = numberOfLines + (children.match(/\n/g) || []).length
    }
    return (
      <Text
        style={[text, style]}
        numberOfLines={numberOfLines}
        allowFontScaling={!disableFontScaling}
        adjustsFontSizeToFit={!disableFontScaling}
        minimumFontScale={0.65}
        {...props}
      >
        {children}
      </Text>
    )
  }
}

const getStyles = cacheStyles((theme: Theme) => ({
  text: {
    color: theme.primaryText,
    fontFamily: theme.fontFaceDefault,
    fontSize: theme.rem(1)
  }
}))

export const EdgeText = withTheme(EdgeTextComponent)
