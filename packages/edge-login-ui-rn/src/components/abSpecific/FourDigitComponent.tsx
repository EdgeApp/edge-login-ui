import * as React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import { Theme, ThemeProps, withTheme } from '../services/ThemeContext'

interface OwnProps {
  error: string | null
  pin: string
  spinner: boolean
}

type Props = OwnProps & ThemeProps

class FourDigitComponent extends React.PureComponent<Props> {
  render() {
    const { error, spinner, theme } = this.props
    const styles = getStyles(theme)
    return (
      <View style={styles.container}>
        <View style={styles.interactiveContainer}>
          {spinner ? (
            <ActivityIndicator color={theme.primaryText} size="large" />
          ) : (
            this.renderDotContainer()
          )}
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText} numberOfLines={2}>
            {error}
          </Text>
        </View>
      </View>
    )
  }

  renderDotContainer() {
    const { pin, theme } = this.props
    const styles = getStyles(theme)

    return (
      <View style={styles.dotContainer}>
        <View style={[styles.circle, pin.length > 0 && styles.circleSected]} />
        <View style={[styles.circle, pin.length > 1 && styles.circleSected]} />
        <View style={[styles.circle, pin.length > 2 && styles.circleSected]} />
        <View style={[styles.circle, pin.length > 3 && styles.circleSected]} />
      </View>
    )
  }
}

export const FourDigit = withTheme(FourDigitComponent)

const getStyles = cacheStyles((theme: Theme) => ({
  // used for logging *back in* with PIN
  container: {
    paddingTop: theme.rem(0.75),
    width: '100%',
    height: theme.rem(5.5)
  },
  errorContainer: {
    height: theme.rem(2.5),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  errorText: {
    color: theme.dangerText,
    textAlign: 'center',
    fontSize: theme.rem(0.75)
  },
  interactiveContainer: {
    height: theme.rem(5.5),
    width: '100%',
    alignItems: 'center'
  },
  dotContainer: {
    height: '100%',
    width: theme.rem(12),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  circle: {
    borderWidth: 2,
    borderColor: theme.primaryText,
    borderRadius: theme.rem(1),
    height: theme.rem(2),
    width: theme.rem(2)
  },
  circleSected: {
    backgroundColor: theme.iconTappable,
    borderWidth: 2,
    borderColor: theme.primaryText,
    borderRadius: theme.rem(1),
    height: theme.rem(2),
    width: theme.rem(2)
  }
}))
