// @flow

import * as React from 'react'
import { type TextFieldProps, TextField } from 'react-native-material-textfield'

import { unpackEdges } from '../../util/edges.js'
import { type ThemeProps, withTheme } from '../services/ThemeContext.js'

type Props = {|
  ...TextFieldProps,
  ...ThemeProps,
  marginRem?: number | number[]
|}

class ThemedTextFieldComponent extends React.PureComponent<Props> {
  render() {
    const { theme, marginRem = 0.5, ...rest } = this.props
    const margin = unpackEdges(marginRem)

    return (
      <TextField
        containerStyle={{
          marginBottom: theme.rem(margin.bottom),
          marginLeft: theme.rem(margin.left),
          marginRight: theme.rem(margin.right),
          marginTop: theme.rem(margin.top)
        }}
        fontSize={theme.rem(1)}
        labelFontSize={theme.rem(0.75)}
        baseColor={theme.primaryText}
        errorColor={theme.dangerText}
        textColor={theme.primaryText}
        tintColor={theme.primaryText}
        {...rest}
      />
    )
  }
}

export const ThemedTextField = withTheme(ThemedTextFieldComponent)
