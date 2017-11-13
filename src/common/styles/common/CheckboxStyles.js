import { fontSize } from '../../../common/util'
import * as Constants from '../../constants/'
const BasicCheckBoxWithLabel = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  text: {
    fontSize: fontSize(11),
    color: Constants.GRAY_2
  },
  checkbox: {
    padding: 2
  }
}

const BasicCheckBoxWithLabelAlignRight = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  text: {
    fontSize: Constants.FONTS.defaultFontSize,
    color: Constants.GRAY_2
  },
  checkbox: {
    padding: 2
  }
}
const MultiLineTextCheckBox = {
  container: {
    position: 'relative',
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  text: {
    fontSize: (Constants.FONTS.defaultFontSize + 2),
    color: Constants.GRAY_2
  },
  checkbox: {
    position: 'relative',
    height: '100%',
    padding: 10,
    justifyContent: 'flex-start'
  }
}

export { BasicCheckBoxWithLabel }
export { BasicCheckBoxWithLabelAlignRight }
export { MultiLineTextCheckBox }
