// @flow
import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { Button } from '../common'
import { LOGO_DOT } from '../../../native/assets/'

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
            <Text style={Style.headlineText}>Delete Account</Text>
          </View>
          <View style={Style.textContainer}>
            <Text style={Style.copyText}>
              Delete {this.props.username} on this device? This will disable
              access via PIN. If 2FA is enabled on this account, this device
              will not be able to login without a 2FA reset which takes 7 days.
            </Text>
          </View>
          <View style={Style.buttonsContainer}>
            <Button
              onPress={this.onCancelPress.bind(this)}
              downStyle={Style.cancelButton.downStyle}
              downTextStyle={Style.cancelButton.downTextStyle}
              upStyle={Style.cancelButton.upStyle}
              upTextStyle={Style.cancelButton.upTextStyle}
              label={'Cancel'} // TODO localize
            />
            <Button
              onPress={this.onDeletePress.bind(this)}
              downStyle={Style.skipButton.downStyle}
              downTextStyle={Style.skipButton.downTextStyle}
              upStyle={Style.skipButton.upStyle}
              upTextStyle={Style.skipButton.upTextStyle}
              label={'Delete'} // TODO localize
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
