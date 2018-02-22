// @flow
import React, { Component } from 'react'
import AutoComplete from 'material-ui/AutoComplete'

type Props = {}
type State = {
  username: string,
  password: string,
  loggingIn: boolean,
  focusFirst: boolean,
  focusSecond: boolean,
  dataSource: string
}
export default class AutoCompleteInput extends Component<Props, State> {
  componentWillMount () {
    this.setState({
      username: '',
      password: '',
      loggingIn: false,
      focusFirst: true,
      focusSecond: false
    })
  }
  handleUpdateInput = (arg: string) => {}
  render () {
    return (
      <div>
        <AutoComplete
          hintText="Type anything"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          floatingLabelText="Full width"
          fullWidth
        />
      </div>
    )
  }
}
