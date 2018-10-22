// @flow

import * as Constants from '../../../common/constants'
import { scale } from '../../../common/util'

const ListItemTextOnly = {
  container: {
    width: '100%',
    padding: scale(10)
  },
  text: {
    fontSize: scale(14),
    color: Constants.GRAY_1
  },
  textPressed: {
    fontSize: scale(14),
    color: Constants.BLACK
  },
  underlayColor: Constants.GRAY_3
}

export { ListItemTextOnly }
