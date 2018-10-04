// @flow

import * as Constants from '../../constants/'
import { vs } from '../../util'
import { scale } from '../../util/scaling'
import { BasicCheckBoxWithLabelScaled } from '../'

const PasswordStatusStyle = {
  container: {
    height: vs(129),
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Constants.GRAY_4
  },
  containerWhite: {
    height: vs(129),
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
    height: vs(110),
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Constants.GRAY_4
  },
  containerWhite: {
    height: vs(110),
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
    flex: 5,
    flexDirection: 'column',
    top: scale(5)
  },
  checkboxContainer: {
    height: scale(20),
    marginTop: scale(4)
  },
  textContainer: {
    position: 'relative',
    width: '100%',
    flexDirection: 'column',
    marginTop: scale(5),
    flex: 2,
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
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: scale(10),
    marginBottom: scale(6),
    fontSize: scale(14)
  }
}

export { PasswordStatusStyle }
export { PasswordStatusScaledStyle }
