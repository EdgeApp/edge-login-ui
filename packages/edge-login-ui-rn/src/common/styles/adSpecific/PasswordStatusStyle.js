// @flow

import * as Constants from '../../constants/'
import { scale } from '../../util/scaling'
import { BasicCheckBoxWithLabelScaled } from '../'

const PasswordStatusStyle = {
  container: {
    height: scale(129),
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Constants.GRAY_4
  },
  containerWhite: {
    height: scale(129),
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Constants.WHITE
  },
  instructions: {
    fontSize: 17,
    textAlign: 'center',
    width: '80%',
    fontFamily: Constants.FONTS.fontFamilyRegular
  },
  boxes: {
    flex: 5,
    flexDirection: 'column',
    top: 5
  },
  checkboxContainer: {
    height: scale(20),
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
  checkboxes: BasicCheckBoxWithLabelScaled,
  text: {
    textAlign: 'center',
    fontFamily: Constants.FONTS.fontFamilyRegular,
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 10,
    marginBottom: 6,
    fontSize: 11
  }
}

const PasswordStatusScaledStyle = {
  container: {
    height: scale(80 + 48),
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Constants.GRAY_4
  },
  containerWhite: {
    height: scale(80 + 48),
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Constants.WHITE
  },
  instructions: {
    fontSize: scale(17),
    textAlign: 'center',
    width: '80%',
    fontFamily: Constants.FONTS.fontFamilyRegular
  },
  boxes: {
    flexDirection: 'column',
    top: scale(5)
  },
  checkboxContainer: {
    height: scale(80),
    marginTop: scale(4)
  },
  textContainer: {
    position: 'relative',
    width: '100%',
    flexDirection: 'column',
    marginTop: scale(5),
    height: scale(48),
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  shim: {
    height: scale(5),
    width: scale(30)
  },
  checkboxes: BasicCheckBoxWithLabelScaled,
  text: {
    textAlign: 'center',
    fontFamily: Constants.FONTS.fontFamilyRegular,
    width: '90%',
    marginTop: scale(6),
    marginBottom: scale(6),
    fontSize: scale(12)
  }
}

export { PasswordStatusStyle }
export { PasswordStatusScaledStyle }
