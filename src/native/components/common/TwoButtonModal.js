import React, {Component} from 'react'
import {TwoButtonModalDefaultStyle} from '../../../common/styles/'
import {
  View,
  Text
  /* TouchableOpacity,
  Platform */
} from 'react-native'
import {IconButton, Gradient, Icon} from './'
import Modal from 'react-native-modal'
import * as Constants from '../../../common/constants'
/* type Props = {
headerText
headerSubtext
icon
} */
class TwoButtonModal extends Component {
  renderMiddle () {

  }
  renderBottom () {

  }
  renderIcon () {

  }
  renderGradient (styles, icon, size) {
    <Gradient style={[styles.modalHeaderIconWrapBottom]}>
      <Icon
        style={styles.modalHeaderIconWrapTop}
        icon={icon}
        size={size} />
    </Gradient>
  }

  render () {
    const styles = TwoButtonModalDefaultStyle
    const {
      headerText,
      headerSubtext,
      icon,
      iconSize
    } = this.props
    return <Modal style={styles.margins} >
      <View style={styles.modalBox}>
        <View style={styles.exitRow}>
          <IconButton
            style={styles}
            icon={Constants.CLOSE_ICON}
            onPress={this.props.onExitButtonFxn.bind(this)}
            />
        </View>
        <View style={styles.modalBody}>
          <View style={styles.modalTopTextWrap}>
            <Text style={styles.modalTopText} text={headerText} />
            <Text style={styles.modalTopSubtext} text={headerSubtext} />
          </View>
        </View>
      </View>
      {this.renderGradient(styles, icon, iconSize)}
    </Modal>
  }
}

export { TwoButtonModal }
