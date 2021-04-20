// @flow

import * as React from 'react'

import { MaterialInput } from './MaterialInput.js'

type Props = {
  testID?: string,
  style: Object,
  label: string,
  value: string,
  autoCorrect: boolean,
  autoFocus: boolean,
  forceFocus: boolean,
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
  secureTextEntry: boolean,
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send',
  error?: string,
  onFocus(): void,
  onBlur(): void,
  onChangeText(): void,
  onSubmitEditing(): void
}

type State = {
  secure: boolean,
  autoFocus: boolean
}

class FormField extends React.Component<Props, State> {
  static defaultProps = {
    value: '',
    returnKeyType: 'done'
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      secure: this.props.secureTextEntry ? this.props.secureTextEntry : false,
      autoFocus: this.props.autoFocus
    }
  }

  render() {
    const {
      container,
      baseColor,
      tintColor,
      textColor,
      errorColor,
      titleTextStyle
    } = this.props.style
    return (
      <MaterialInput
        testID={this.props.testID}
        label={this.props.label}
        value={this.props.value}
        onChangeText={this.props.onChangeText}
        error={this.props.error}
        containerStyle={container}
        secureTextEntry={this.state.secure}
        returnKeyType={this.props.returnKeyType}
        baseColor={baseColor}
        tintColor={tintColor}
        textColor={textColor}
        errorColor={errorColor}
        titleTextStyle={titleTextStyle}
        autoFocus={this.state.autoFocus}
        forceFocus={this.props.forceFocus}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        autoCapitalize={this.props.autoCapitalize}
        autoCorrect={this.props.autoCorrect}
        onSubmitEditing={this.handleSubmitEditing}
      />
    )
  }

  handleSubmitEditing = (event: any) => {
    if (this.props.onSubmitEditing) {
      this.props.onSubmitEditing()
    }
  }
}

export { FormField }
