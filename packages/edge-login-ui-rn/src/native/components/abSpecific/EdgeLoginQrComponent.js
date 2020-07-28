// @flow

import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import { getEdgeLoginQrCode } from '../../../actions/LoginAction.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { EdgeLoginQrStyle } from '../../styles/index.js'
import { QrCode } from '../common/QrCode.js'

type StateProps = {
  edgeLoginId: string,
  cancelEdgeLogin(): void
}
type DispatchProps = {
  cancelRequest(): void,
  getQrCode(): void
}
type Props = StateProps & DispatchProps

class EdgeLoginQrComponent extends Component<Props> {
  componentDidMount() {
    this.props.getQrCode()
  }

  componentWillUnmount() {
    this.props.cancelEdgeLogin()
    this.props.cancelRequest()
  }

  render() {
    const style = EdgeLoginQrStyle
    const { edgeLoginId } = this.props
    const { qrCodeSize, qrCodeForeground, qrCodeBackground } = style

    return (
      <View style={style.container}>
        {edgeLoginId == null ? null : (
          <QrCode
            data={edgeLoginId}
            size={qrCodeSize}
            backgroundColor={qrCodeBackground.color}
            foregroundColor={qrCodeForeground.color}
          />
        )}
      </View>
    )
  }
}

export const EdgeLoginQr = connect(
  (state: RootState) => ({
    edgeLoginId: state.login.edgeLoginId,
    cancelEdgeLogin: state.login.cancelEdgeLoginRequest
  }),
  (dispatch: Dispatch) => ({
    cancelRequest() {
      dispatch({ type: 'CANCEL_EDGE_LOGIN_REQUEST' })
    },
    getQrCode() {
      dispatch(getEdgeLoginQrCode())
    }
  })
)(EdgeLoginQrComponent)
