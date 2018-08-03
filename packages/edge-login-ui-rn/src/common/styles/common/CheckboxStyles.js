// @flow

import * as Constants from '../../constants/'
import { scale } from '../../util/scaling.js'

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
    fontSize: 13,
    color: Constants.GRAY_2,
    fontFamily: Constants.FONTS.fontFamilyRegular
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
    fontFamily: Constants.FONTS.fontFamilyRegular,
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
    fontSize: Constants.FONTS.defaultFontSize + 2,
    color: Constants.GRAY_2,
    fontFamily: Constants.FONTS.fontFamilyRegular
  },
  checkbox: {
    position: 'relative',
    height: '100%',
    padding: 10,
    justifyContent: 'flex-start'
  }
}

const BasicCheckBoxWithLabelScaled = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  text: {
    fontSize: scale(13),
    color: Constants.GRAY_2,
    fontFamily: Constants.FONTS.fontFamilyRegular
  },
  checkbox: {
    padding: scale(2),
    marginRight: scale(5)
  }
}

const BasicCheckBoxWithLabelAlignRightScaled = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  text: {
    fontSize: scale(Constants.FONTS.defaultFontSize),
    fontFamily: Constants.FONTS.fontFamilyRegular,
    color: Constants.GRAY_2
  },
  checkbox: {
    padding: scale(2)
  }
}

const MultiLineTextCheckBoxScaled = {
  container: {
    position: 'relative',
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  text: {
    fontSize: scale(Constants.FONTS.defaultFontSize + 2),
    color: Constants.GRAY_2,
    fontFamily: Constants.FONTS.fontFamilyRegular
  },
  checkbox: {
    position: 'relative',
    height: '100%',
    padding: scale(10),
    justifyContent: 'flex-start'
  }
}

export { BasicCheckBoxWithLabel }
export { BasicCheckBoxWithLabelAlignRight }
export { MultiLineTextCheckBox }

export { BasicCheckBoxWithLabelScaled }
export { BasicCheckBoxWithLabelAlignRightScaled }
export { MultiLineTextCheckBoxScaled }
