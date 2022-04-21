import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { Theme, ThemeProps, withTheme } from '../services/ThemeContext'
interface OwnProps {
  data: string
  onClick: (username: string) => void
  onDelete: (username: string) => void
}
type Props = OwnProps & ThemeProps

class UserListItemComponent extends React.Component<Props> {
  handleDelete = () => {
    this.props.onDelete(this.props.data)
  }

  handlePress = () => {
    this.props.onClick(this.props.data)
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        {this.renderInside()}
      </TouchableOpacity>
    )
  }

  renderInside() {
    const { theme } = this.props
    const styles = getStyles(theme)

    return (
      <View style={styles.container}>
        <View style={styles.textComtainer}>
          <Text style={styles.text}>{this.props.data}</Text>
        </View>
        <TouchableOpacity
          style={styles.iconButtonContainer}
          onPress={this.handleDelete}
        >
          <MaterialIcon
            style={styles.iconButtonIcon}
            name="close"
            size={theme.rem(1)}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export const UserListItem = withTheme(UserListItemComponent)

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    height: theme.rem(2.5),
    width: '100%',
    backgroundColor: theme.modal,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textComtainer: {
    flex: 25,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  iconButtonContainer: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%'
  },
  iconButtonIcon: {
    color: theme.icon
  },
  text: {
    paddingLeft: theme.rem(1.25),
    color: theme.primaryText,
    backgroundColor: '#fff0',
    fontFamily: theme.fontFaceDefault,
    fontSize: theme.rem(1)
  }
}))
