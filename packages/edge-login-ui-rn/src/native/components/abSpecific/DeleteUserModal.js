// @flow

import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
import { sprintf } from 'sprintf-js'

import s from '../../../common/locales/strings'
import { LOGO_DOT } from '../../../native/assets/'
import { Button } from '../common'

type Props = {
  style: any,
  username: string,
  cancelFunc(): void,
  deleteFunc(string): void
}

type State = {
  isDeleting: boolean
}

class DeleteUserModal extends Component<Props, State> {
  componentWillMount () {
    this.setState({
      isDeleting: false
    })
  }
  render () {
    const Style = this.props.style
    return (
      <View style={Style.container}>
        <View style={Style.backgroundContainer}>
          <View style={Style.backgroundBox} />
        </View>
        <View style={Style.foreground}>
          <View style={Style.logoContainer}>
            <Image source={LOGO_DOT} />
          </View>
          <View style={Style.headlineContainer}>
            <Text style={Style.headlineText}>
              {s.strings.delete_account_header}
            </Text>
          </View>
          <View style={Style.textContainer}>
            <Text style={Style.copyText}>
              {sprintf(s.strings.delete_username_account, this.props.username)}
            </Text>
          </View>
          <View style={Style.buttonsContainer}>
            <Button
              onPress={this.onCancelPress.bind(this)}
              downStyle={Style.cancelButton.downStyle}
              downTextStyle={Style.cancelButton.downTextStyle}
              upStyle={Style.cancelButton.upStyle}
              upTextStyle={Style.cancelButton.upTextStyle}
              label={s.strings.cancel}
            />
            <Button
              onPress={this.onDeletePress.bind(this)}
              downStyle={Style.skipButton.downStyle}
              downTextStyle={Style.skipButton.downTextStyle}
              upStyle={Style.skipButton.upStyle}
              upTextStyle={Style.skipButton.upTextStyle}
              label={s.strings.delete}
              isThinking={this.state.isDeleting}
              doesThink
            />
          </View>
        </View>
      </View>
    )
  }
  onCancelPress () {
    this.props.cancelFunc()
  }
  onDeletePress () {
    this.setState({
      isDeleting: true
    })
    this.props.deleteFunc(this.props.username)
  }
}

export { DeleteUserModal }
