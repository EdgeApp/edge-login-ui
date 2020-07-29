// @flow

import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  Text,
  View
} from 'react-native'
import Modal from 'react-native-modal'

import * as Constants from '../../../common/constants/index.js'
import { scale } from '../../../common/util/scaling.js'
import * as Styles from '../../styles/index.js'
import { Button, Icon, IconButton } from './'

type Props = {
  styles: Object,
  headerText: string,
  headerSubtext: string,
  icon: string,
  iconType: string,
  image: string,
  actionLabel: string,
  cancelLabel: string,
  singleButton: boolean,
  singleCancelButton: boolean,
  buttonTimerSeconds?: number,
  modalDismissTimerSeconds?: number,
  hideCancelX: boolean,
  middleText: string,
  modalMiddleComponent?: any,
  thinking: boolean,
  action(): void,
  cancel(): void
}

type State = {
  showButtons: boolean
}

export class MyModal extends Component<Props, State> {
  // $FlowFixMe
  reset: number
  constructor(props: Props) {
    super(props)
    this.state = {
      showButtons: !this.props.buttonTimerSeconds
    }
  }

  componentDidMount() {
    if (this.props.buttonTimerSeconds) {
      setTimeout(() => {
        this.setState({
          showButtons: true
        })
      }, this.props.buttonTimerSeconds * 1000)
    }
    if (this.props.modalDismissTimerSeconds) {
      this.reset = setTimeout(() => {
        this.props.cancel()
      }, this.props.modalDismissTimerSeconds * 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.reset)
  }

  renderMiddle = (styles: Object) => {
    if (this.props.modalMiddleComponent) {
      return this.props.modalMiddleComponent
    }

    return <Text style={styles.modalMiddleText}>{this.props.middleText}</Text>
  }

  renderBottom = (styles: Object) => {
    if (!this.state.showButtons) {
      return <View style={styles.buttonsWrap} />
    }
    if (this.props.thinking) {
      return (
        <View style={styles.activityWrap}>
          <ActivityIndicator />
        </View>
      )
    }
    if (this.props.singleButton) {
      return (
        <View style={styles.buttonsWrap}>
          <Button
            label={this.props.actionLabel}
            upStyle={styles.twoButtonConfig.actionButton.up}
            upTextStyle={styles.twoButtonConfig.actionButton.upText}
            downStyle={styles.twoButtonConfig.actionButton.down}
            downTextStyle={styles.twoButtonConfig.actionButton.downText}
            onPress={this.props.action}
          />
        </View>
      )
    }
    if (this.props.singleCancelButton) {
      return (
        <View style={styles.buttonsWrap}>
          <Button
            label={this.props.cancelLabel}
            upStyle={styles.twoButtonConfig.cancelButton.up}
            upTextStyle={styles.twoButtonConfig.cancelButton.upText}
            downStyle={styles.twoButtonConfig.cancelButton.down}
            downTextStyle={styles.twoButtonConfig.cancelButton.downText}
            onPress={this.props.cancel}
          />
        </View>
      )
    }
    return (
      <View style={styles.buttonsWrap}>
        <View style={styles.twoButtonConfig.cancelButtonWrap}>
          <Button
            label={this.props.cancelLabel}
            upStyle={styles.twoButtonConfig.cancelButton.up}
            upTextStyle={styles.twoButtonConfig.cancelButton.upText}
            downStyle={styles.twoButtonConfig.cancelButton.down}
            downTextStyle={styles.twoButtonConfig.cancelButton.downText}
            onPress={this.props.cancel}
          />
        </View>
        <View style={styles.twoButtonConfig.actionButtonWrap}>
          <Button
            label={this.props.actionLabel}
            upStyle={styles.twoButtonConfig.actionButton.up}
            upTextStyle={styles.twoButtonConfig.actionButton.upText}
            downStyle={styles.twoButtonConfig.actionButton.down}
            downTextStyle={styles.twoButtonConfig.actionButton.downText}
            onPress={this.props.action}
          />
        </View>
      </View>
    )
  }

  renderGradient = (
    styles: Object,
    icon: string,
    iconType: string,
    image: string
  ) => {
    if (image) {
      return (
        <View style={styles.modalHeaderIconWrapBottom}>
          <Image source={image} />
        </View>
      )
    }
    return (
      <View style={styles.modalHeaderIconWrapBottom}>
        <Icon
          style={styles.iconStyle}
          name={icon}
          size={styles.iconSize}
          type={iconType}
        />
      </View>
    )
  }

  renderCloseX = (styles: Object) => {
    if (this.props.hideCancelX) {
      return null
    }
    return (
      <IconButton
        style={styles.closeIconButton}
        icon={Constants.CLOSE_ICON}
        iconType={Constants.MATERIAL_ICONS}
        onPress={this.props.cancel}
      />
    )
  }

  render() {
    const styles = this.props.styles ? this.props.styles : ModalStyle
    const { headerText, headerSubtext, icon, iconType, image } = this.props

    const deviceWidth = Dimensions.get('window').width
    const deviceHeight =
      Platform.OS === 'ios'
        ? Dimensions.get('window').height
        : require('react-native-extra-dimensions-android').get(
            'REAL_WINDOW_HEIGHT'
          )

    return (
      <Modal
        animationType="slide"
        deviceHeight={deviceHeight}
        deviceWidth={deviceWidth}
        style={styles.container}
        transparent
        visible
      >
        <View style={styles.modalBox}>
          <View style={styles.exitRow}>{this.renderCloseX(styles)}</View>
          <View style={styles.modalBody}>
            <View style={styles.modalTopTextWrap}>
              <Text style={styles.modalTopText}>{headerText}</Text>
              {headerSubtext && (
                <Text style={styles.modalTopSubtext}>{headerSubtext}</Text>
              )}
              <View style={styles.modalMiddle}>
                {this.renderMiddle(styles)}
              </View>
              {this.renderBottom(styles)}
            </View>
          </View>
        </View>
        {this.renderGradient(styles, icon, iconType, image)}
      </Modal>
    )
  }
}

const OFFSET_HACK = scale(-19)

const screenDimensions = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
}
const ModalStyle = {
  container: {
    position: 'absolute',
    bottom: OFFSET_HACK,
    left: OFFSET_HACK,
    right: OFFSET_HACK,
    top: OFFSET_HACK,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.MODAL_BOX
  },
  modalBox: {
    top: screenDimensions.height / 8,
    left: screenDimensions.width / 16,
    width: (screenDimensions.width * 7) / 8,
    borderRadius: scale(3),
    borderWidth: 2,
    borderColor: Constants.GRAY_2,
    alignItems: 'stretch',
    position: 'absolute',
    // height: (screenDimensions.height) / 3,
    backgroundColor: Constants.WHITE,
    padding: 10,
    paddingTop: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  exitRow: {
    alignItems: 'flex-end',
    position: 'relative',
    minHeight: 20
  },
  modalHeaderIconWrapBottom: {
    position: 'absolute',
    left: screenDimensions.width / 2 - 27,
    top: screenDimensions.height / 8 - 28,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: Constants.PRIMARY,
    backgroundColor: Constants.WHITE,
    height: 54,
    width: 54,
    zIndex: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  closeIconButton: {
    ...Styles.IconButtonStyle,
    iconSize: 18,
    icon: { ...Styles.IconButtonStyle.icon, color: Constants.GRAY_2 },
    iconPressed: { ...Styles.IconButtonStyle.icon, color: Constants.GRAY_1 }
  },
  iconSize: 32,
  iconStyle: {
    color: Constants.PRIMARY,
    backgroundColor: Constants.TRANSPARENT,
    overflow: 'hidden'
  },
  modalBody: {
    position: 'relative',
    justifyContent: 'space-between'
  },
  modalTopTextWrap: {
    padding: 10,
    paddingBottom: 4
  },
  modalTopText: {
    textAlign: 'center',
    color: Constants.PRIMARY,
    fontSize: scale(16)
  },
  modalTopSubtext: {
    fontSize: scale(14),
    color: Constants.GRAY_1,
    textAlign: 'center',
    paddingTop: 4
  },
  modalMiddleText: {
    fontSize: scale(Constants.FONTS.defaultFontSize),
    color: Constants.GRAY_1,
    textAlign: 'center',
    paddingTop: 4
  },
  modalMiddle: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: scale(4)
  },
  buttonsWrap: {
    position: 'relative',
    marginTop: scale(10),
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  activityWrap: {
    position: 'relative',
    marginTop: scale(20),
    flex: 1,
    height: Constants.BUTTON_HEIGHT,
    width: '100%',
    flexDirection: 'column',
    aligItems: 'center',
    justifyContent: 'space-around'
  },
  twoButtonConfig: {
    cancelButtonWrap: {
      position: 'relative',
      alignSelf: 'flex-start',
      width: '49%',
      height: scale(Constants.BUTTON_HEIGHT)
    },
    actionButtonWrap: {
      position: 'relative',
      alignSelf: 'flex-end',
      width: '49%',
      height: scale(Constants.BUTTON_HEIGHT),
      marginLeft: '2%'
    },
    actionButton: {
      up: {
        ...Styles.PrimaryButtonUpStyle,
        width: Constants.BUTTON_100_PERCENT
      },
      upText: Styles.PrimaryButtonUpTextStyle,
      down: {
        ...Styles.PrimaryButtonDownStyle,
        width: Constants.BUTTON_100_PERCENT
      },
      downText: Styles.PrimaryButtonDownTextStyle
    },
    cancelButton: {
      up: {
        ...Styles.SecondaryButtonUpStyle,
        width: Constants.BUTTON_100_PERCENT
      },
      upText: Styles.SecondaryButtonUpTextStyle,
      down: {
        ...Styles.SecondaryButtonDownStyle,
        width: Constants.BUTTON_100_PERCENT
      },
      downText: Styles.SecondaryButtonDownTextStyle
    }
  }
}
