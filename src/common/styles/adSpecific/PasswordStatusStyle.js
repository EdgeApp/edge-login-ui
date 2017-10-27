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
    flex: 5,
    flexDirection: 'column',
    top: 5

  },
  checkboxContainer: {
    height: vs(20),
    marginTop: 4
  },
  textContainer: {
    position: 'relative',
    width: '100%',
    flexDirection: 'column',
    marginTop: 5,
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  shim: {
    height: 5,
    width: 30
  },
  checkboxes: BasicCheckBoxWithLabel,
  text: {
    textAlign: 'center',
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: 6,
    fontSize: 11

  }
}

export { PasswordStatusStyle }
