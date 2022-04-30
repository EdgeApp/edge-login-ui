import { EdgeLoginMessages } from 'edge-core-js'
import * as React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { AirshipBridge } from 'react-native-airship'
import { cacheStyles } from 'react-native-patina'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import s from '../../common/locales/strings'
import { Theme, ThemeProps, withTheme } from '../services/ThemeContext'
import { ModalCloseArrow } from '../themed/ModalParts'
import { ThemedModal } from '../themed/ThemedModal'
import { TitleText } from '../themed/ThemedText'

interface OwnProps {
  bridge: AirshipBridge<unknown>
  messages: EdgeLoginMessages
  selectUser: (username: string) => void
}
type Props = OwnProps & ThemeProps

class SecurityAlertsModalComponent extends React.Component<Props> {
  render() {
    const { bridge, theme } = this.props

    return (
      <ThemedModal
        borderColor={theme.warningText}
        borderWidth={4}
        bridge={bridge}
        onCancel={() => bridge.resolve(undefined)}
      >
        <TitleText>{s.strings.alert_modal_title}</TitleText>
        {this.renderList()}
        <ModalCloseArrow onPress={() => bridge.resolve(undefined)} />
      </ThemedModal>
    )
  }

  renderList(): React.ReactNode {
    const { messages } = this.props
    const out: React.ReactNode[] = []

    let isFirst = true
    for (const username of Object.keys(messages)) {
      const { otpResetPending } = messages[username]
      if (otpResetPending) {
        out.push(this.renderRow(username, true, isFirst))
        isFirst = false
      }
    }
    for (const username of Object.keys(messages)) {
      const { pendingVouchers = [] } = messages[username]
      if (pendingVouchers.length > 0) {
        out.push(this.renderRow(username, false, isFirst))
        isFirst = false
      }
    }

    return out
  }

  renderRow(username: string, isReset: boolean, isFirst: boolean) {
    const { bridge, theme } = this.props
    const styles = getStyles(theme)

    return (
      <TouchableOpacity
        key={(isReset ? 'reset:' : 'voucher:') + username}
        style={isFirst ? styles.row : styles.rowBorder}
        onPress={() => {
          this.props.selectUser(username)
          bridge.resolve(undefined)
        }}
      >
        <FontAwesome
          color={isReset ? theme.dangerText : theme.warningText}
          name="exclamation-triangle"
          size={theme.rem(1.5)}
          style={styles.rowIcon}
        />
        <Text style={styles.rowText}>
          <Text style={styles.bold}>
            {isReset
              ? s.strings.alert_modal_reset
              : s.strings.alert_modal_voucher}
            {username}
          </Text>
          {s.strings.alert_modal_action}
        </Text>
        <AntDesignIcon
          color={theme.iconTappable}
          name="right"
          size={theme.rem(1)}
          style={styles.rowIcon}
        />
      </TouchableOpacity>
    )
  }
}

const getStyles = cacheStyles((theme: Theme) => ({
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  rowBorder: {
    alignItems: 'center',
    borderTopColor: theme.lineDivider,
    borderTopWidth: theme.thinLineWidth,
    flexDirection: 'row',
    marginTop: theme.rem(0.5),
    paddingTop: theme.rem(0.5)
  },
  rowIcon: {
    margin: theme.rem(0.5)
  },
  rowText: {
    color: theme.primaryText,
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: theme.fontFaceDefault,
    fontSize: theme.rem(1),
    margin: theme.rem(0.5)
  },
  bold: {
    fontWeight: 'bold'
  }
}))

export const SecurityAlertsModal = withTheme(SecurityAlertsModalComponent)
