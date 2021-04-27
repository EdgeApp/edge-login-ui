// @flow

import * as React from 'react'
import { Text, View } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import s from '../../common/locales/strings.js'
import * as Constants from '../../constants/index.js'
import * as Styles from '../../styles/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { scale } from '../../util/scaling.js'
import { TextAndIconButton } from '../common/TextAndIconButton.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  testID?: string
}
type StateProps = {
  username?: string,
  password?: string,
  pin: string
}
type Props = OwnProps & StateProps

type State = {
  collapsed: boolean
}

class AccountInfoComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      collapsed: true
    }
  }

  renderPasswordWarning() {
    if (!this.props.password) {
      return (
        <View style={styles.bottomWarning}>
          <Text style={styles.bottomWarningText}>
            {s.strings.account_info_warning}
          </Text>
          <View style={styles.shim} />
        </View>
      )
    }
    return null
  }

  renderAccountInfo() {
    if (!this.props.password) {
      return (
        <View
          style={[
            styles.bottomInfo,
            !this.props.password && {
              ...styles.bottomInfo,
              borderBottomColor: Constants.TRANSPARENT
            }
          ]}
        >
          <View style={styles.shim} />
          <View style={styles.bRow}>
            <View style={styles.bInfoLeft} />
            <View style={styles.bInfoCenter}>
              <Text style={styles.accountText}>{s.strings.username}:</Text>
            </View>
            <View style={styles.bInforRight}>
              <Text style={styles.accountText}>{this.props.username}</Text>
            </View>
          </View>
          <View style={styles.bRow}>
            <View style={styles.bInfoLeft} />
            <View style={styles.bInfoCenter}>
              <Text style={styles.accountText}>{s.strings.pin}:</Text>
            </View>
            <View style={styles.bInforRight}>
              <Text style={styles.accountText}>{this.props.pin}</Text>
            </View>
          </View>
          <View style={styles.shim} />
        </View>
      )
    }
    return (
      <View style={styles.bottomInfo}>
        <View style={styles.shim} />
        <View style={styles.bRow}>
          <View style={styles.bInfoLeft} />
          <View style={styles.bInfoCenter}>
            <Text style={styles.accountText}>{s.strings.username}:</Text>
          </View>
          <View style={styles.bInforRight}>
            <Text style={styles.accountText}>{this.props.username}</Text>
          </View>
        </View>
        <View style={styles.bRow}>
          <View style={styles.bInfoLeft} />
          <View style={styles.bInfoCenter}>
            <Text style={styles.accountText}>{s.strings.password}:</Text>
          </View>
          <View style={styles.bInforRight}>
            <Text style={styles.accountText}>{this.props.password}</Text>
          </View>
        </View>
        <View style={styles.bRow}>
          <View style={styles.bInfoLeft} />
          <View style={styles.bInfoCenter}>
            <Text style={styles.accountText}>{s.strings.pin}:</Text>
          </View>
          <View style={styles.bInforRight}>
            <Text style={styles.accountText}>{this.props.pin}</Text>
          </View>
        </View>
        <View style={styles.shim} />
      </View>
    )
  }

  renderBottom() {
    if (!this.state.collapsed) {
      return (
        <View style={styles.bottom}>
          {this.renderAccountInfo()}
          {this.renderPasswordWarning()}
        </View>
      )
    }
    return <View style={styles.bottom} />
  }

  renderTop() {
    const msg = this.state.collapsed
      ? s.strings.show_account_info
      : s.strings.hide_account_info
    const icon = this.state.collapsed ? (
      <MaterialIcon
        style={styles.textIconButton.icon}
        name="keyboard-arrow-down"
        size={styles.textIconButton.iconSize}
      />
    ) : (
      <MaterialIcon
        style={styles.textIconButton.icon}
        name="keyboard-arrow-up"
        size={styles.textIconButton.iconSize}
      />
    )

    return (
      <View style={styles.top}>
        <TextAndIconButton
          testID={this.props.testID}
          style={styles.textIconButton}
          icon={icon}
          onPress={this.handlePress}
          title={msg}
        />
      </View>
    )
  }

  handlePress = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          !this.state.collapsed && {
            ...styles.container,
            borderWidth: 0,
            borderColor: Constants.GRAY_3
          }
        ]}
      >
        {this.renderTop()}
        {this.renderBottom()}
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column'
  },
  textIconButton: {
    ...Styles.TextAndIconButtonScaledStyle,
    text: {
      ...Styles.TextAndIconButtonScaledStyle.text,
      fontSize: scale(Styles.CreateAccountFont.defaultFontSize),
      color: Constants.SECONDARY
    },
    textPressed: {
      ...Styles.TextAndIconButtonScaledStyle.text,
      fontSize: scale(Styles.CreateAccountFont.defaultFontSize),
      color: Constants.SECONDARY
    },
    icon: {
      ...Styles.TextAndIconButtonScaledStyle.icon,
      color: Constants.SECONDARY
    }
  },
  top: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Constants.GRAY_4,
    height: scale(Styles.BUTTON_HEIGHT)
  },
  shim: {
    width: '100%',
    height: scale(5),
    backgroundColor: Constants.TRANSPARENT
  },
  bottom: {
    width: '100%',
    flexDirection: 'column'
  },
  bottomInfo: {
    width: '100%',
    minHeight: scale(60),
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: Constants.GRAY_4
  },
  bRow: {
    width: '100%',
    flexDirection: 'row',
    paddingRight: scale(25),
    paddingVertical: scale(4)
  },
  bInfoLeft: {
    flex: 2
  },
  bInfoCenter: {
    flex: 3.5,
    flexWrap: 'nowrap'
  },
  bInforRight: {
    flex: 5
  },
  bottomWarning: {
    width: '100%',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: Constants.GRAY_4
  },
  accountText: {
    fontSize: scale(13),
    color: Constants.GRAY_1
  },
  bottomWarningText: {
    fontSize: scale(Constants.FONTS.defaultFontSize),
    fontFamily: Constants.FONTS.fontFamilyRegular,
    color: Constants.ACCENT_RED,
    paddingLeft: scale(15),
    paddingRight: scale(15),
    paddingBottom: scale(15)
  }
}

export const AccountInfo = connect<StateProps, {}, OwnProps>(
  (state: RootState) => ({
    username: state.create.username || '',
    password: state.create.password || '',
    pin: state.create.pin
  }),
  (dispatch: Dispatch) => ({})
)(AccountInfoComponent)
