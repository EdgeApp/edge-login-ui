// @flow

import * as Colors from '../../../common/constants/Colors'
import { scale } from '../../util/scaling.js'

const InputStyles = {
  container: {
    position: 'relative',
    borderBottomColor: Colors.PRIMARY,
    borderBottomWidth: 1,
    width: '100%'
  },
  inputStyle: {
    position: 'relative',
    color: '#FFFFFF'
    // fontSize: 24,
    // lineHeight: 40,
    // margin: 20
  },
  fontSize: scale(15),
  titleFontSize: scale(12),
  labelFontSize: scale(12)
}

export { InputStyles }
