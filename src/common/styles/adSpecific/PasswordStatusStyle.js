import * as Colors from '../../constants/Colors'
import { vs, fontSize } from '../../util'

import { BasicCheckBoxWithLabel } from '../'
const PasswordStatusStyle = {
  container: {
    backgroundColor: Colors.WHITE,
    height: vs(100),
    width: '100%'
  },
  instructions: {
    fontSize: fontSize(17),
    textAlign: 'center'
  },
  checkboxContainer: {
    width: '100%',
    height: 20
  },
  checkboxes: BasicCheckBoxWithLabel
}

export { PasswordStatusStyle }
