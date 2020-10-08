// @flow

import * as React from 'react'
import { Text, View } from 'react-native'

import { PASSWORD_REQ_CHECKED, PASSWORD_REQ_UNCHECKED } from '../../assets'
import s from '../../common/locales/strings.js'
import { type PasswordStatusState } from '../../reducers/PasswordStatusReducer.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { Checkbox } from '../common/Checkbox'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  style: Object
}
type StateProps = {
  secondsToCrack?: string,
  status: PasswordStatusState | null
}
type Props = OwnProps & StateProps

class PasswordStatusComponent extends React.Component<Props> {
  render() {
    const style = this.props.style
    if (this.props.status) {
      return (
        <View style={style.container}>
          <View style={style.boxes}>
            {this.renderStatusList(style, this.props.status)}
          </View>
          <View style={style.textContainer}>
            <Text style={style.text}>{this.props.secondsToCrack}</Text>
          </View>
        </View>
      )
    }
    return (
      <View style={style.containerWhite}>
        <Text style={style.instructions}>{s.strings.password_desc}</Text>
      </View>
    )
  }

  onChange = () => {
    // do nothing
  }

  renderStatusList(style: Object, status: PasswordStatusState) {
    return status.list.map(Item => (
      <View style={style.checkboxContainer} key={Item.title}>
        <Checkbox
          style={style.checkboxes}
          label={Item.title}
          value={Item.value}
          isSelected={false}
          onChange={this.onChange}
          checkedImage={PASSWORD_REQ_CHECKED}
          uncheckedImage={PASSWORD_REQ_UNCHECKED}
          disabled
        />
      </View>
    ))
  }
}

export const PasswordStatus = connect<StateProps, {}, OwnProps>(
  (state: RootState) => ({
    status: state.passwordStatus,
    secondsToCrack: state.passwordStatus
      ? state.passwordStatus.secondsToCrack
      : ''
  }),
  (dispatch: Dispatch) => ({})
)(PasswordStatusComponent)
