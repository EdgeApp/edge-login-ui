// @flow

import { type EdgePendingEdgeLogin } from 'edge-core-js'
import * as React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { type AirshipBridge } from 'react-native-airship'
import { cacheStyles } from 'react-native-patina'

import { requestEdgeLogin } from '../../actions/LoginAction.js'
import s from '../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { QrCode } from '../common/QrCode.js'
import { showError } from '../services/AirshipInstance.js'
import { connect } from '../services/ReduxStore.js'
import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../services/ThemeContext.js'
import {
  ModalCloseArrow,
  ModalMessage,
  ModalTitle
} from '../themed/ModalParts.js'
import { ThemedModal } from '../themed/ThemedModal.js'

type OwnProps = {
  bridge: AirshipBridge<void>
}
type StateProps = {}
type DispatchProps = {
  requestEdgeLogin(): Promise<EdgePendingEdgeLogin>
}
type Props = OwnProps & StateProps & DispatchProps & ThemeProps

type State = {
  pendingLogin?: EdgePendingEdgeLogin
}

class QrCodeModalComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { requestEdgeLogin } = this.props
    requestEdgeLogin()
      .then(pendingLogin => this.setState({ pendingLogin }))
      .catch(showError)
  }

  componentWillUnmount() {
    if (this.state.pendingLogin != null) this.state.pendingLogin.cancelRequest()
  }

  render() {
    const { bridge, theme } = this.props
    const { pendingLogin } = this.state
    const styles = getStyles(theme)

    return (
      <ThemedModal bridge={bridge} onCancel={() => bridge.resolve()}>
        <ModalTitle>{s.strings.qr_modal_title}</ModalTitle>
        <ModalMessage>{s.strings.qr_modal_message}</ModalMessage>
        <View style={styles.qrContainer}>
          {pendingLogin == null ? (
            <ActivityIndicator />
          ) : (
            <QrCode
              data={'edge://edge/' + pendingLogin.id}
              size={theme.rem(14)}
            />
          )}
        </View>
        <ModalCloseArrow onPress={() => bridge.resolve()} />
      </ThemedModal>
    )
  }
}

const getStyles = cacheStyles((theme: Theme) => ({
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: theme.rem(16),
    padding: theme.rem(1)
  }
}))

export const QrCodeModal = withTheme(
  connect<StateProps, DispatchProps, OwnProps & ThemeProps>(
    (state: RootState) => ({}),
    (dispatch: Dispatch) => ({
      requestEdgeLogin() {
        return dispatch(requestEdgeLogin())
      }
    })
  )(QrCodeModalComponent)
)
