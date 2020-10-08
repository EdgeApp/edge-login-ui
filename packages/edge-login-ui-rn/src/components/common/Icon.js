// @flow

import * as React from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'

import * as Constants from '../../constants/index.js'

type Props = {
  style: Object,
  name: string,
  size: number,
  type: string
}

const Icon = ({ style, name, size, type }: Props) => {
  switch (type) {
    case Constants.ION_ICONS:
      return <IonIcon style={style} name={name} size={size} />
    case Constants.MATERIAL_ICONS:
      return <MaterialIcon style={style} name={name} size={size} />
    case Constants.SIMPLE_ICONS:
      return <SimpleIcon style={style} name={name} size={size} />
  }
  console.warn(
    'No icon: Probably forgot the type ' + type + 'or ' + name + 'doesnt exist'
  )
  return null
}

export { Icon }
