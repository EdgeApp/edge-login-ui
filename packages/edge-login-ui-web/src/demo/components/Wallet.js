// @flow

import type { EdgeAccount, EdgeCurrencyWallet } from 'edge-login-ui-web'
import QRCode from 'qrcode.react'
import React, { Component } from 'react'

export type WalletProps = {
  account: EdgeAccount,
  wallet: EdgeCurrencyWallet
}

export type WalletState = {
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

export class Wallet extends Component<WalletProps, WalletState> {
  unsub1: () => mixed
  unsub2: () => mixed
  unsub3: () => mixed

  constructor (props: WalletProps) {
    super(props)

    this.state = {
      address: '?',
      balance: '0',
      balanceFiat: 0,
      height: 0,
      name: this.props.wallet.name || 'Untitled',
      sendingText: void 0,
      spendAddress: '0x8e7f5f49c8ed369630e6e259e5034e90d5eb8131',
      spendAmount: '0',
      spendFiat: 0
    }

    this.props.wallet.getReceiveAddress().then(blah => {
      const { publicAddress } = blah
      this.setState({ address: publicAddress })
    })
  }

  // Spend button was clicked:
  doSpend = () => {
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

  // Spend address box was edited
  changeAddress = (event: Object) => {
    this.setState({ spendAddress: event.currentTarget.value })
  }

  // Spend amount box was edited
  changeAmount = async (event: Object) => {
    const spendAmount = event.currentTarget.value
    const spendFiat = await this.props.account.exchangeCache.convertCurrency(
      'ETH',
      'iso:USD',
      Number(spendAmount) / 1e18
    )
    this.setState({ spendAmount, spendFiat })
  }

  render () {
    const prettyBalance = (Number(this.state.balance) / 1e18).toFixed(6)
    const prettyFiat = this.state.balanceFiat.toFixed(4)

    return (
      <div>
        <h2>{this.state.name}</h2>
        <p>Address: {this.state.address}</p>
        <QRCode value={this.state.address} />
        <p>
          ETH balance: {prettyBalance} (${prettyFiat})
        </p>
        <p>Block height: {this.state.height} </p>
        <h3>Spend</h3>
        <p>
          <label>Address:</label>&nbsp;
          <input
            id="address"
            type="text"
            value={this.state.spendAddress}
            onChange={this.changeAddress}
          />
        </p>
        <p>
          <label>Amount:</label>&nbsp;
          <input
            id="amount"
            type="text"
            value={this.state.spendAmount}
            onChange={this.changeAmount}
          />&nbsp; ${this.state.spendFiat.toFixed(2)}
        </p>
        <button onClick={this.doSpend}>
          {this.state.sendingText || 'Send'}
        </button>
      </div>
    )
  }

  // Subscribes to changes in wallet properties:
  componentDidMount () {
    const { wallet } = this.props

    this.unsub1 = wallet.watch('balances', async balances => {
      const balance = balances['ETH']
      const balanceFiat = await this.props.account.exchangeCache.convertCurrency(
        'ETH',
        'iso:USD',
        Number(balance) / 1e18
      )
      this.setState({ balance, balanceFiat })
    })

    this.unsub2 = wallet.watch('blockHeight', blockHeight => {
      this.setState({ height: blockHeight })
    })

    this.unsub3 = wallet.watch('name', name => {
      this.setState({ name: name || 'Untitled' })
    })
  }

  // Unsubscribe from wallet property changes:
  componentWillUnmount () {
    this.unsub1()
    this.unsub2()
    this.unsub3()
  }
}
