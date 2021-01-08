// @flow

import * as React from 'react'
import { Text, View } from 'react-native'

import { PASSWORD_REQ_CHECKED, PASSWORD_REQ_UNCHECKED } from '../../assets'
import s from '../../common/locales/strings.js'
import * as Constants from '../../constants/index.js'
import { type PasswordStatusState } from '../../reducers/PasswordStatusReducer.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { scale } from '../../util/scaling.js'
import { Checkbox } from '../common/Checkbox'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {}
type StateProps = {
  secondsToCrack?: string,
  status: PasswordStatusState | null
}
type Props = OwnProps & StateProps

class PasswordStatusComponent extends React.Component<Props> {
  render() {
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

const style = {
  container: {
    height: scale(80 + 48),
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Constants.GRAY_4
  },
  containerWhite: {
    height: scale(80 + 48),
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Constants.WHITE
  },
  instructions: {
    fontSize: scale(17),
    textAlign: 'center',
    width: '80%',
    fontFamily: Constants.FONTS.fontFamilyRegular
  },
  boxes: {
    flexDirection: 'column',
    top: scale(5)
  },
  checkboxContainer: {
    height: scale(16),
    marginTop: scale(4)
  },
  textContainer: {
    position: 'relative',
    width: '100%',
    flexDirection: 'column',
    marginTop: scale(5),
    height: scale(48),
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  shim: {
    height: scale(5),
    width: scale(30)
  },
  checkboxes: {
    container: {
      position: 'relative',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row'
    },
    text: {
      fontSize: scale(13),
      color: Constants.GRAY_2,
      fontFamily: Constants.FONTS.fontFamilyRegular
    },
    checkbox: {
      padding: scale(2),
      marginRight: scale(5)
    }
  },
  text: {
    textAlign: 'center',
    fontFamily: Constants.FONTS.fontFamilyRegular,
    width: '90%',
    marginTop: scale(6),
    marginBottom: scale(6),
    fontSize: scale(12)
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
