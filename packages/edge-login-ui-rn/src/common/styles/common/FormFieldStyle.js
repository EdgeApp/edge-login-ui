// @flow

import * as Constants from '../../../common/constants/'
import { scale } from '../../util/scaling'

const MaterialInput = {
  container: {
    position: 'relative',
    width: Constants.LOGIN_LABEL_WIDTH,
    minHeight: scale(Constants.LOGIN_LABEL_HEIGHT)
  },
  baseColor: Constants.WHITE,
  tintColor: Constants.ACCENT_MINT,
  errorColor: Constants.ACCENT_RED,
  textColor: Constants.WHITE,
  affixTextStyle: {
    color: Constants.WHITE
  },
  titleTextStyle: {
    color: Constants.WHITE
  }
}

const MaterialInputWithDrop = {
  container: {
    position: 'relative',
    width: Constants.LOGIN_LABEL_WIDTH,
    minHeight: scale(Constants.LOGIN_LABEL_HEIGHT)
  },
  materialInput: {
    ...MaterialInput,
    container: {
      ...MaterialInput.container,
      width: '144%'
    }
  },
  searchContainer: {
    width: '144%',
    minHeight: 0,
    backgroundColor: Constants.ACCENT_ORANGE
  },
  row: {
    // backgroundColor: THEME.COLORS.WHITE, padding: 10
  },
  listItem: {
    container: {
      height: scale(Constants.DROP_LABEL_HEIGHT),
      width: '100%',
      backgroundColor: Constants.WHITE,
      borderBottomColor: Constants.GRAY_4,
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    textComtainer: {
      flex: 9,
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    iconButton: {
      container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%'
      },
      icon: {
        color: Constants.PRIMARY
      },
      iconPressed: {
        color: Constants.SECONDARY
      },
      iconSize: scale(Constants.FONTS.defaultFontSize),
      underlayColor: Constants.TRANSPARENT
    },
    text: {
      color: Constants.PRIMARY,
      backgroundColor: Constants.TRANSPARENT,
      fontFamily: Constants.FONTS.fontFamilyRegular,
      marginLeft: scale(8),
      fontSize: scale(Constants.FONTS.defaultFontSize)
    }
  }
}

const MaterialInputOnWhite = {
  container: {
    position: 'relative',
    width: Constants.LOGIN_LABEL_WIDTH,
    height: Constants.LOGIN_LABEL_HEIGHT
  },
  baseColor: Constants.PRIMARY,
  tintColor: Constants.SECONDARY,
  errorColor: Constants.ACCENT_RED,
  textColor: Constants.BLACK,
  affixTextStyle: {
    color: Constants.ACCENT_RED,
    fontFamily: Constants.FONTS.fontFamilyRegular
  },
  titleTextStyle: {
    color: Constants.PRIMARY,
    fontFamily: Constants.FONTS.fontFamilyRegular
  }
}

const MaterialInputOnWhiteScaled = {
  container: {
    position: 'relative',
    width: Constants.LOGIN_LABEL_WIDTH,
    height: scale(Constants.LOGIN_LABEL_HEIGHT),
    marginTop: scale(15)
  },
  baseColor: Constants.PRIMARY,
  tintColor: Constants.SECONDARY,
  errorColor: Constants.ACCENT_RED,
  textColor: Constants.BLACK,
  affixTextStyle: {
    color: Constants.ACCENT_RED,
    fontFamily: Constants.FONTS.fontFamilyRegular
  },
  titleTextStyle: {
    color: Constants.PRIMARY,
    fontFamily: Constants.FONTS.fontFamilyRegular
  }
}

export { MaterialInputOnWhite }
export { MaterialInputOnWhiteScaled }
export { MaterialInput }
export { MaterialInputWithDrop }
