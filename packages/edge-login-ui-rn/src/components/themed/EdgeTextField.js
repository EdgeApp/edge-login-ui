// @flow

import * as React from 'react'
import { TextField } from 'react-native-material-textfield'

import { unpackEdges } from '../../util/edges.js'
import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../services/ThemeContext.js'

type Props = {
  // The gap around the button. Takes 0-4 numbers (top, right, bottom, left),
  // using the same logic as the web `margin` property. Defaults to 0.
  marginRem?: number[] | number,

  // The gap inside the button. Takes 0-4 numbers (top, right, bottom, left),
  // using the same logic as the web `padding` property. Defaults to 0.5.
  paddingRem?: number[] | number
}

class EdgeTextFieldComponent extends React.PureComponent<Props & ThemeProps> {
  render() {
    const { theme, ...props } = this.props
    return (
      <TextField
        textColor={theme.primaryText}
        tintColor={theme.primaryText}
        baseColor={theme.primaryText}
        errorColor={theme.dangerText}
        containerStyle={spacingStyles(props, theme)}
        {...props}
      />
    )
  }
}

export const EdgeTextField = withTheme(EdgeTextFieldComponent)

function spacingStyles(props: Props, theme: Theme) {
  const marginRem = unpackEdges(props.marginRem)
  const paddingRem = unpackEdges(props.paddingRem)

  return {
    marginBottom: theme.rem(marginRem.bottom),
    marginLeft: theme.rem(marginRem.left),
    marginRight: theme.rem(marginRem.right),
    marginTop: theme.rem(marginRem.top),
    paddingBottom: theme.rem(paddingRem.bottom),
    paddingLeft: theme.rem(paddingRem.left),
    paddingRight: theme.rem(paddingRem.right),
    paddingTop: theme.rem(paddingRem.top)
  }
}
