import { vs, fontSize } from '../../util'
import { BasicCheckBoxWithLabel } from '../'
import * as Colors from '../../constants/Colors'

const PasswordStatusStyle = {
  container: {
    height: vs(129),
    width: '100%',
    backgroundColor: Colors.GRAY_4
  },
  instructions: {
    fontSize: fontSize(17),
    textAlign: 'center'
  },
  checkboxContainer: {
    width: '80%',
    height: 20,
    backgroundColor: '#ffffff',
    top: 20
  },
  checkboxes: BasicCheckBoxWithLabel,
  text: {
    textAlign: 'center',
    width: '100%'
  }
}

export { PasswordStatusStyle }
