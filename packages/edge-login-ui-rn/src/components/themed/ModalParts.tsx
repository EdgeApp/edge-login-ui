import { wrap } from 'cavy'
import * as React from 'react'
import { cacheStyles } from 'react-native-patina'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

import { TouchableOpacity } from '../../types/wrappedReactNative'
import { Theme, useTheme } from '../services/ThemeContext'

const ModalCloseArrowComponent = (props: { onPress?: () => void }) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.closeArrow}>
      <AntDesignIcon
        name="down"
        size={theme.rem(1.25)}
        color={theme.iconTappable}
      />
    </TouchableOpacity>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  closeArrow: {
    alignItems: 'center',
    paddingTop: theme.rem(1)
  }
}))

export const ModalCloseArrow = wrap(ModalCloseArrowComponent)
