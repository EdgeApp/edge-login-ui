// @flow

import * as Comstants from '../../../common/constants/'
const EdgeLoginQrStyle = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  qrCodeBorder: {
    backgroundColor: Comstants.WHITE,
    borderRadius: 4,
    padding: 10
  },
  qrCodeForeground: {
    color: Comstants.WHITE
  },
  qrCodeBackground: {
    color: Comstants.BLACK
  },
  qrCodeSize: 120
}
export { EdgeLoginQrStyle }
