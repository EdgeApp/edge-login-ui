// @flow

import React, { Component } from 'react'
import { Text } from 'react-native'

import s from '../../../../common/locales/strings'

export default class CreatingAccountWaitScreenComponent extends Component<
  {},
  {}
> {
  render () {
    return <Text>{s.strings.encrypting}</Text>
  }
}
