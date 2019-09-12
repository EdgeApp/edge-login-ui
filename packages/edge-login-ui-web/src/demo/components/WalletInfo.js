// @flow

import type { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js'
import QRCode from 'qrcode.react'
import React, { Component } from 'react'

type Props = {
  account: EdgeAccount,
  wallet: EdgeCurrencyWallet
}

type State = {
  address: string,
  balance: string,
  balanceFiat: number,
  height: number,
  name: string,
  spendAddress: string,
  spendAmount: string,
  spendFiat: number,
  sendingText: string | void
}

export class WalletInfo extends Component<Props, State> {
  unsub1: () => mixed
  unsub2: () => mixed
  unsub3: () => mixed

  constructor (props: Props) {
    super(props)

    const balance = this.props.wallet.balances['ETH']
    const name = this.props.wallet.name || 'Untitled'
    const height = this.props.wallet.blockHeight

    this.state = {
      address: '?',
      balance,
      balanceFiat: 0,
      height,
      name,
      sendingText: void 0,
      spendAddress: '',
      spendAmount: '0',
      spendFiat: 0
    }

    this.updateAddress()
    this.updateBalanceFiat()
  }

  /**
   * Fetches an address from the wallet.
   */
  async updateAddress () {
    const address = await this.props.wallet.getReceiveAddress()
    this.setState({ address: address.publicAddress })
  }

  /**
   * Converts the wallet balance to fiat.
   */
  async updateBalanceFiat () {
    const balanceFiat = await this.props.account.exchangeCache.convertCurrency(
      'ETH',
      'iso:USD',
      Number(this.state.balance) / 1e18
    )
    this.setState({ balanceFiat })
  }

  /**
   * Spend address box was edited.
   */
  onSpendAddressChanged = (event: Object) => {
    this.setState({ spendAddress: event.currentTarget.value })
  }

  /**
   * Spend amount box was edited.
   */
  onSpendAmountChanged = async (event: Object) => {
    const spendAmount = event.currentTarget.value
    const spendFiat = await this.props.account.exchangeCache.convertCurrency(
      'ETH',
      'iso:USD',
      Number(spendAmount) / 1e18
    )
    this.setState({ spendAmount, spendFiat })
  }

  /**
   * Spend button was clicked.
   */
  onSpend = () => {
    this.setState({ sendingText: 'Sending...' })
    const { wallet } = this.props
    return wallet
      .makeSpend({
        spendTargets: [
          {
            publicAddress: this.state.spendAddress,
            nativeAmount: this.state.spendAmount
          }
        ]
      })
      .then(tx => wallet.signTx(tx))
      .then(tx => {
        console.log('Sending:', tx)
        wallet.broadcastTx(tx)
        wallet.saveTx(tx)
        this.setState({ sendingText: void 0 })
        return tx
      })
      .catch(e => this.setState({ sendingText: String(e) }))
  }

  render () {
    const prettyBalance = (Number(this.state.balance) / 1e18).toFixed(6)
    const prettyFiat = this.state.balanceFiat.toFixed(4)

    return (
      <div>
        <h1>Wallet</h1>
        <p>Name: {this.state.name}</p>
        <p>
          ETH balance: {prettyBalance} (${prettyFiat})
        </p>
        <p>Block height: {this.state.height} </p>
        <p>Address: {this.state.address}</p>
        <QRCode value={this.state.address} />
        <h2>Spend</h2>
        <p>
          <label>Amount:</label>&nbsp;
          <input
            id="amount"
            type="text"
            value={this.state.spendAmount}
            onChange={this.onSpendAmountChanged}
          />
          &nbsp; ${this.state.spendFiat.toFixed(2)}
        </p>
        <p>
          <label>Address:</label>&nbsp;
          <input
            id="address"
            type="text"
            value={this.state.spendAddress}
            onChange={this.onSpendAddressChanged}
          />
        </p>
        <button onClick={this.onSpend}>
          {this.state.sendingText || 'Send'}
        </button>
      </div>
    )
  }

  /**
   * Subscribes to changes in wallet properties.
   */
  componentDidMount () {
    const { wallet } = this.props

    this.unsub1 = wallet.watch('balances', async balances => {
      const balance = balances['ETH']
      this.setState({ balance })
      this.updateBalanceFiat()
    })

    this.unsub2 = wallet.watch('blockHeight', blockHeight => {
      this.setState({ height: blockHeight })
    })

    this.unsub3 = wallet.watch('name', name => {
      this.setState({ name: name || 'Untitled' })
    })
  }

  /**
   * Unsubscribes from wallet property changes.
   */
  componentWillUnmount () {
    this.unsub1()
    this.unsub2()
    this.unsub3()
  }
}
