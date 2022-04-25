import * as React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import s from '../../common/locales/strings'
import { isIphoneX } from '../../util/isIphoneX'
import { Theme, ThemeProps, withTheme } from '../services/ThemeContext'
import { PinButton } from '../themed/PinButton'

type Key = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'back'

interface OwnProps {
  disabled?: boolean
  onPress: (key: Key) => void
}

type Props = OwnProps & ThemeProps

class PinKeypadComponent extends React.PureComponent<Props> {
  render() {
    const { disabled, onPress, theme } = this.props
    const styles = getStyles(theme)

    return (
      <View style={styles.keypadContainer}>
        <View style={styles.keypadInner}>
          <View style={styles.keypadRow}>
            <View style={styles.keypadBox}>
              <PinButton
                label={s.strings.keypad_one}
                onPress={() => onPress('1')}
              />
            </View>
            <View style={styles.keypadBox}>
              <PinButton
                label={s.strings.keypad_two}
                onPress={() => onPress('2')}
              />
            </View>
            <View style={styles.keypadBox}>
              <PinButton
                label={s.strings.keypad_three}
                onPress={() => onPress('3')}
              />
            </View>
          </View>
          <View style={styles.keypadRow}>
            <View style={styles.keypadBox}>
              <PinButton
                label={s.strings.keypad_four}
                onPress={() => onPress('4')}
              />
            </View>
            <View style={styles.keypadBox}>
              <PinButton
                label={s.strings.keypad_five}
                onPress={() => onPress('5')}
              />
            </View>
            <View style={styles.keypadBox}>
              <PinButton
                label={s.strings.keypad_six}
                onPress={() => onPress('6')}
              />
            </View>
          </View>
          <View style={styles.keypadRow}>
            <View style={styles.keypadBox}>
              <PinButton
                label={s.strings.keypad_seven}
                onPress={() => onPress('7')}
              />
            </View>
            <View style={styles.keypadBox}>
              <PinButton
                label={s.strings.keypad_eight}
                onPress={() => onPress('8')}
              />
            </View>
            <View style={styles.keypadBox}>
              <PinButton
                label={s.strings.keypad_nine}
                onPress={() => onPress('9')}
              />
            </View>
          </View>
          <View style={styles.keypadRow}>
            <View style={styles.keypadColumnBlank} />
            <View style={styles.keypadBox}>
              <PinButton
                label={s.strings.keypad_zero}
                onPress={() => onPress('0')}
              />
            </View>
            <TouchableWithoutFeedback
              onPress={() => onPress('back')}
              disabled={disabled}
            >
              <View style={styles.keypadColumnBack}>
                <MaterialIcon name="backspace" style={styles.keypadKeysBack} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    )
  }
}

export const PinKeypad = withTheme(PinKeypadComponent)

const getStyles = cacheStyles((theme: Theme) => ({
  keypadContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  keypadInner: {
    flex: 1,
    maxWidth: theme.rem(22),
    height: theme.rem(13),
    maxHeight: theme.rem(19),
    marginBottom: isIphoneX ? theme.rem(1.75) : 0
  },
  keypadRow: {
    flex: 1,
    flexDirection: 'row'
  },
  keypadBox: {
    flex: 1,
    margin: theme.rem(0.125),
    // borderColor: 'red',
    // borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  keypadColumnBack: {
    flex: 1,
    margin: theme.rem(0.125),
    justifyContent: 'center',
    alignItems: 'center'
  },
  keypadColumnBlank: {
    flex: 1,
    margin: theme.rem(0.125)
  },
  keypadKeysBack: {
    textAlign: 'center',
    fontSize: theme.rem(2),
    color: theme.secondaryButtonOutline
  }
}))
