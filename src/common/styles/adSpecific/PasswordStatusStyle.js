import * as Colors from '../../constants/Colors'
import { vs, fontSize } from '../../util'

const PasswordStatusStyle = {
  container: {
    backgroundColor: Colors.ACCENT_GREEN,
    height: vs(100),
    width: '100%'
  },
  instructions: {
    fontSize: fontSize(17),
    textAlign: 'center'
  }
}

export { PasswordStatusStyle }
