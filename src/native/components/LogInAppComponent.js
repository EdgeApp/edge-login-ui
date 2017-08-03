import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Spinner } from './common'

export default class LoginAppComponent extends Component {
  componentWillMount () {
    this.props.getPreviousUsers()
  }
  render () {
    return (
      <View>
        {this.renderContent()}
      </View>
    )
  }
  renderContent () {
    if (this.props.previousUsers) {
      return (
        <Button onPress={this.onButtonPress.bind(this)}>
          Log in
        </Button>
      )
    }

    return <Spinner />
  }

  onButtonPress () {
    this.props.userLogin({ username: 'bob20', password: 'bob20' })
  }
}
