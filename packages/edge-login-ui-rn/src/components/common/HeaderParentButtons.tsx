import * as React from 'react'
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import * as Assets from '../../assets/'
import s from '../../common/locales/strings'
import { Branding } from '../../types/Branding'
import { Theme, ThemeProps, withTheme } from '../services/ThemeContext'

interface OwnProps {
  branding: Branding
}

type Props = OwnProps & ThemeProps

class HeaderParentButtonsComponent extends React.Component<Props> {
  handlePress = () => {
    const { parentButton } = this.props.branding
    if (parentButton != null) parentButton.callback()
  }

  render() {
    const { parentButton, appId } = this.props.branding
    const openEdgeSite = () => Linking.openURL(s.strings.edge_site)
    const styles = getStyles(this.props.theme)

    return (
      <View style={styles.container}>
        {parentButton && parentButton.text && (
          <TouchableOpacity onPress={this.handlePress}>
            <View style={styles.leftButtonContainer}>
              <Text style={parentButton.style || styles.leftButtonText}>
                {parentButton.text}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.spacer} />
        {appId && (
          <TouchableOpacity onPress={openEdgeSite}>
            <View style={styles.rightButtonContainer}>
              <Text style={styles.rightButtonText}>{s.strings.powered_by}</Text>
              <Image
                source={Assets.LOGO_SMALL}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

export const HeaderParentButtons = withTheme(HeaderParentButtonsComponent)

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    top: theme.rem(2),
    marginLeft: theme.rem(1),
    marginRight: theme.rem(1),
    flexDirection: 'row'
  },
  leftButtonContainer: {
    justifyContent: 'center',
    alignContents: 'center',
    height: theme.rem(2)
  },
  leftButtonText: {
    fontFamily: theme.fontFaceDefault,
    color: theme.primaryText,
    fontSize: theme.rem(1)
  },
  rightButtonContainer: {
    justifyContent: 'flex-end',
    alignContents: 'flex-end',
    height: theme.rem(2)
  },
  rightButtonText: {
    color: theme.primaryText,
    fontSize: theme.rem(0.5),
    textAlign: 'right'
  },
  spacer: {
    flex: 1
  },
  image: {
    width: theme.rem(4.5),
    height: theme.rem(1.25)
  }
}))
