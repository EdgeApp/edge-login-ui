import React, { Component } from 'react'
import MediaQuery from 'react-responsive'

import Footer from './components/Footer'
import Header from './components/Header'
type Props = {
  onClose(): void,
  children: Component
}
export class ModalContainer extends Component<Props> {
  renderBox = () => {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <div className="bigSquare">
            <Header onClose={this.props.onClose} />
            <div className="loginSystemContainer">{this.props.children}</div>
            <Footer />
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <div className="bigSquareMobile">
            <Header onClose={this.props.onClose} />
            <div className="loginSystemContainer">{this.props.children}</div>
            <Footer />
          </div>
        </MediaQuery>
      </section>
    )
  }
  render () {
    return (
      <div>
        <div className="modalContainerBackground" />
        <div className="modalContainer">{this.renderBox()}</div>
      </div>
    )
  }
}
