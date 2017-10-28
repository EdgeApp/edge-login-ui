import React, { Component } from 'react'
import { ModalStyle } from '../../../common/styles/'
import { View, Text } from /* TouchableOpacity,
  Platform */
'react-native'
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
action()
cancel()
singleButton? boolean
middleText
modalMiddleComponent? any
} */
class MyModal extends Component {
  renderMiddle (styles) {
    if (this.props.modalMiddleComponent) return this.props.modalMiddleComponent

    return <Text style={styles.modalMiddleText} >{this.props.middleText}</Text>
  }
  renderBottom (styles) {
    if (this.props.singleButton) {
      return null
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

  renderGradient (styles, icon, iconType) {
    /* return <View style={[styles.modalHeaderIconWrapBottom]}>
      <Icon style={styles.iconStyle} icon={icon} size={styles.iconSize} type={iconType} />
    </View> */
    return <View style={[styles.modalHeaderIconWrapBottom]}>
      <View style={styles.modalHeaderIconWrapTop}>
        <Icon style={styles.iconStyle} icon={icon} size={styles.iconSize} type={iconType} />
      </View>
    </View>
  }

  render () {
    const styles = this.props.styles ? this.props.styles : ModalStyle
    const {headerText, headerSubtext, icon, iconType} = this.props
    return (
      <Modal style={styles.container} animationType={'slide'} transparent visible>
        <View style={styles.modalBox}>
          <View style={styles.exitRow}>
            <IconButton
              style={styles.closeIconButton}
              icon={Constants.CLOSE_ICON}
              iconType={Constants.MATERIAL_ICONS}
              onPress={this.props.cancel}
            />
          </View>
          <View style={styles.modalBody}>
            <View style={styles.modalTopTextWrap}>
              <Text style={styles.modalTopText} >{headerText}</Text>
              <Text style={styles.modalTopSubtext} >{headerSubtext}</Text>
              <View style={styles.modalMiddle}>
                {this.renderMiddle(styles)}
              </View>
              {this.renderBottom(styles)}
            </View>
          </View>
        </View>
        {this.renderGradient(styles, icon, iconType)}
      </Modal>
    )
  }
}

export { MyModal }
