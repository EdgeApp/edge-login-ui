import { vs, fontSize } from '../../util'
import { BasicCheckBoxWithLabel } from '../'
import * as Colors from '../../constants/Colors'

const PasswordStatusStyle = {
  container: {
    height: vs(129),
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.GRAY_4
  },
  instructions: {
    fontSize: fontSize(14),
    textAlign: 'center',
    width: '80%'
  },
  boxes: {
    width: '100%',
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    top: 10

  },
  checkboxContainer: {
    width: '80%',
    height: vs(20)
  },
  textContianer: {
    width: '100%',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  checkboxes: BasicCheckBoxWithLabel,
  text: {
    textAlign: 'center',
    width: '100%'
  }
}

export { PasswordStatusStyle }
