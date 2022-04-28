import * as React from 'react'
import { cacheStyles } from 'react-native-patina'

import { MaterialInput } from '../common/MaterialInput'
import { Theme, ThemeProps, withTheme } from '../services/ThemeContext'

interface OwnProps {
  testID?: string
  label: string
  value: string
  autoCorrect?: boolean
  autoFocus?: boolean
  forceFocus?: boolean
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  secureTextEntry?: boolean
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send'
  error?: string
  onFocus?: () => void
  onBlur?: () => void
  onChangeText: (text: string) => void
  onSubmitEditing?: () => void
}

type Props = OwnProps & ThemeProps

class LineFormFieldComponent extends React.Component<Props> {
  render() {
    const { theme } = this.props
    const styles = getStyles(theme)

    return (
      <MaterialInput
        testID={this.props.testID}
        label={this.props.label}
        value={this.props.value}
        onChangeText={this.props.onChangeText}
        error={this.props.error}
        containerStyle={styles.container}
        secureTextEntry={this.props.secureTextEntry}
        returnKeyType={this.props.returnKeyType}
        baseColor={theme.primaryText}
        tintColor={theme.iconTappable}
        textColor={theme.outlineTextInputTextColor}
        errorColor={theme.dangerText}
        titleTextStyle={theme.primaryText}
        autoFocus={this.props.autoFocus}
        forceFocus={this.props.forceFocus}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        autoCapitalize={this.props.autoCapitalize}
        autoCorrect={this.props.autoCorrect}
        onSubmitEditing={this.handleSubmitEditing}
      />
    )
  }

  handleSubmitEditing = (): void => {
    if (this.props.onSubmitEditing) {
      this.props.onSubmitEditing()
    }
  }
}

export const LineFormField = withTheme(LineFormFieldComponent)

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    position: 'relative',
    width: '70%',
    minHeight: theme.rem(3.75)
  },
  affixTextStyle: {
    color: theme.primaryText
  },
  titleTextStyle: {
    color: theme.primaryText
  }
}))
