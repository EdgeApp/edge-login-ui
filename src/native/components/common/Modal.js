import React, { Component } from 'react'
import { ModalStyle } from '../../../common/styles/'
import { View, Text, Image, /* TouchableOpacity,
  Platform */
ActivityIndicator} from 'react-native'
import { IconButton, Icon, Button } from './'
import Modal from 'react-native-modal'
import * as Constants from '../../../common/constants'
/* type Props = {
  styles
headerText
iconSize
headerSubtext
icon: string,
actionLabel string
cancelLabel string
singleButton? boolean
buttonTimerSeconds? number,
modalDismissTimerSeconds? number
hideCancelX:boolean
middleText
modalMiddleComponent? any
action()
cancel()
} */

/* type State = {
  showButtons:boolean default true
} */
class MyModal extends Component {
  /* static defaultProps = {
    showcancelButton: true #############
  } */
  constructor (props) {
    super(props)
    this.renderMiddle = styles => {
      if (this.props.modalMiddleComponent) { return this.props.modalMiddleComponent }

      return <Text style={styles.modalMiddleText}>{this.props.middleText}</Text>
    }
    this.renderBottom = styles => {
      if (!this.state.showButtons) {
        return <View style={styles.buttonsWrap} />
      }
      if (this.props.thinking) {
        return <View style={styles.activityWrap} >
          <ActivityIndicator />
        </View>
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
    this.renderGradient = (styles, icon, iconType, image) => {
      if (image) {
        return <View style={styles.modalHeaderIconWrapBottom}>
          <Image source={image} />
        </View>
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
    this.renderCloseX = (styles) => {
      if (this.props.hideCancelX) {
        return null
      }
      return <IconButton
        style={styles.closeIconButton}
        icon={Constants.CLOSE_ICON}
        iconType={Constants.MATERIAL_ICONS}
        onPress={this.props.cancel}
      />
    }
  }
  componentWillMount () {
    this.setState({
      showButtons: !this.props.buttonTimerSeconds
    })
  }
  componentDidMount () {
    if (this.props.buttonTimerSeconds) {
      setTimeout(() => {
        this.setState({
          showButtons: true
        })
      }, this.props.buttonTimerSeconds * 1000)
    }
    if (this.props.modalDismissTimerSeconds) {
      setTimeout(() => {
        this.props.cancel()
      }, this.props.modalDismissTimerSeconds * 1000)
    }
  }
  render () {
    const styles = this.props.styles ? this.props.styles : ModalStyle
    const { headerText, headerSubtext, icon, iconType, image } = this.props
    return (
      <Modal
        style={styles.container}
        animationType={'slide'}
        transparent
        visible
      >
        <View style={styles.modalBox}>
          <View style={styles.exitRow}>
            {this.renderCloseX(styles)}
          </View>
          <View style={styles.modalBody}>
            <View style={styles.modalTopTextWrap}>
              <Text style={styles.modalTopText}>{headerText}</Text>
              <Text style={styles.modalTopSubtext}>{headerSubtext}</Text>
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

export { MyModal }
