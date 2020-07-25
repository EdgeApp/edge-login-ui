// @flow

import * as Constants from '../../../common/constants/'
import { isIphoneX } from '../../../common/util/isIphoneX.js'
import { scale } from '../../../common/util/scaling.js'

const PinKeypadStyle = {
  keypadContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  keypadInner: {
    flex: 1,
    maxWidth: 500,
    height: scale(180),
    maxHeight: 300,
    marginBottom: isIphoneX ? scale(28) : 0
  },
  keypadRow: {
    flex: 1,
    flexDirection: 'row'
  },
  keypadColumn: {
    flex: 1,
    borderColor: Constants.ACCENT_MINT,
    borderWidth: 1,
    margin: scale(2),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  keypadColumnBack: {
    flex: 1,
    margin: scale(2),
    justifyContent: 'center',
    alignItems: 'center'
  },
  keypadColumnBlank: {
    flex: 1,
    margin: scale(2)
  },
  keypadKeys: {
    textAlign: 'center',
    fontSize: scale(14),
    color: Constants.ACCENT_MINT
  },
  keypadKeysBack: {
    textAlign: 'center',
    fontSize: scale(30),
    color: Constants.ACCENT_MINT
  }
}

export { PinKeypadStyle }
