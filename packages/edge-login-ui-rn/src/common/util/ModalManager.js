// @flow

import React, { type ComponentType } from 'react'
import { Dimensions, Platform } from 'react-native'
import Modal from 'react-native-modal'

export type ModalProps<Result> = { onDone(result: Result): mixed }

type QueueEntry = {
  Component: ComponentType<any>,
  onDone: (result: any) => mixed,
  modalProps: Object
}

type State = {
  isHiding: boolean,
  queue: Array<QueueEntry>
}

/**
 * Manages a queue of modal components to show to the user.
 * There should be a single instance of this class mounted somewhere in your
 * React component tree.
 */
export class ModalManager extends React.Component<{}, State> {
  constructor (props: {}) {
    super(props)
    this.state = { isHiding: false, queue: [] }

    // Register as the global modal manager:
    if (globalModalManager != null) {
      const errorMessage = 'The ModalManager must only be mounted once'
      console.warn(errorMessage)
      const error = new Error(errorMessage)
      global.bugsnag && global.bugsnag.notify(error)
    }
    globalModalManager = this
  }

  render () {
    // If the queue is empty, render nothing:
    if (this.state.queue.length === 0) return null

    const deviceWidth = Dimensions.get('window').width
    const deviceHeight =
      Platform.OS === 'ios'
        ? Dimensions.get('window').height
        : require('react-native-extra-dimensions-android').get(
          'REAL_WINDOW_HEIGHT'
        )

    const { Component, onDone, modalProps } = this.state.queue[0]
    return (
      <Modal
        avoidKeyboard
        deviceHeight={deviceHeight}
        deviceWidth={deviceWidth}
        isVisible={!this.state.isHiding}
        onBackButtonPress={() => onDone(null)}
        onBackdropPress={() => onDone(null)}
        onModalHide={this.removeFromQueue}
        useNativeDriver
        {...modalProps}
      >
        <Component onDone={onDone} />
      </Modal>
    )
  }

  componentWillUnmount () {
    // Un-register as the global modal manager:
    globalModalManager = null
  }

  // Removes a just-closed modal from the queue:
  removeFromQueue = () => {
    this.setState({ isHiding: false, queue: this.state.queue.slice(1) })
  }

  showModal<Result> (
    Component: ComponentType<ModalProps<Result>>,
    modalProps: Object
  ): Promise<Result> {
    return new Promise(resolve =>
      // Push the component onto the end of the queue:
      this.setState({
        queue: [
          ...this.state.queue,
          {
            Component,
            onDone: result => {
              this.setState({ isHiding: true })
              resolve(result)
            },
            modalProps
          }
        ]
      })
    )
  }
}

let globalModalManager: ModalManager | null = null

/**
 * Pushes a modal onto the global queue.
 * @param {*} Component A modal component.
 * Receives a single prop, `onDone`, which it should call to hide itself.
 * The value passed to `onDone` becomes the returned promise result.
 */
export async function showModal<Result> (
  Component: ComponentType<ModalProps<Result>>,
  modalProps: Object = {}
): Promise<Result> {
  if (globalModalManager == null) {
    throw new Error('The ModalManager is not mounted')
  }
  return globalModalManager.showModal(Component, modalProps)
}
