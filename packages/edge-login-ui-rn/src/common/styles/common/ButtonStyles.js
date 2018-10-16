// @flow

import * as Constants from '../../constants/'
import { scale } from '../../util/scaling.js'

const PrimaryButtonUpStyle = {
  position: 'relative',
  backgroundColor: Constants.BUTTON_PRIMARY_UP,
  width: Constants.BUTTON_WIDTH_1,
  height: scale(Constants.BUTTON_HEIGHT),
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: scale(Constants.BUTTON_BORDER_RADIUS)
}

const PrimaryWidthButtonUpStyle = {
  ...PrimaryButtonUpStyle,
  width: Constants.BUTTON_100_PERCENT
}
const PrimaryButtonUpTextStyle = {
  position: 'relative',
  color: Constants.WHITE,
  fontSize: scale(Constants.FONTS.defaultButtonTextSize),
  fontFamily: Constants.FONTS.fontFamilyRegular,
  width: '100%',
  textAlign: 'center'
}
const PrimaryButtonDownTextStyle = {
  position: 'relative',
  color: Constants.WHITE,
  fontSize: scale(Constants.FONTS.defaultButtonTextSize),
  fontFamily: Constants.FONTS.fontFamilyRegular,
  width: '100%',
  textAlign: 'center'
}
const PrimaryButtonDownStyle = {
  position: 'relative',
  backgroundColor: Constants.BUTTON_PRIMARY_DOWN,
  width: Constants.BUTTON_WIDTH_1,
  height: scale(Constants.BUTTON_HEIGHT),
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: scale(Constants.BUTTON_BORDER_RADIUS)
}
const PrimaryWidthButtonDownStyle = {
  ...PrimaryButtonDownStyle,
  width: Constants.BUTTON_100_PERCENT
}
const SecondaryButtonUpStyle = {
  position: 'relative',
  backgroundColor: Constants.BUTTON_SECONDARY_UP,
  width: Constants.BUTTON_WIDTH_1,
  height: scale(Constants.BUTTON_HEIGHT),
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: scale(Constants.BUTTON_BORDER_RADIUS)
}

const SecondaryButtonDownStyle = {
  position: 'relative',
  backgroundColor: Constants.BUTTON_SECONDARY_DOWN,
  width: Constants.BUTTON_WIDTH_1,
  height: scale(Constants.BUTTON_HEIGHT),
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: scale(Constants.BUTTON_BORDER_RADIUS)
}
const SecondaryButtonUpTextStyle = {
  position: 'relative',
  color: Constants.WHITE,
  fontFamily: Constants.FONTS.fontFamilyRegular,
  fontSize: scale(Constants.FONTS.defaultButtonTextSize),
  width: '100%',
  textAlign: 'center'
}
const SecondaryButtonDownTextStyle = {
  position: 'relative',
  color: Constants.WHITE,
  fontFamily: Constants.FONTS.fontFamilyRegular,
  fontSize: scale(Constants.FONTS.defaultButtonTextSize),
  width: '100%',
  textAlign: 'center'
}

const TertiaryButtonUpStyle = {
  backgroundColor: Constants.TRANSPARENT,
  width: Constants.BUTTON_WIDTH_1,
  height: scale(Constants.BUTTON_HEIGHT),
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: scale(3),
  borderColor: Constants.ACCENT_MINT,
  borderWidth: Constants.BUTTON_BORDER_STROKE
}

const TertiaryButtonTextUpStyle = {
  color: Constants.ACCENT_MINT,
  fontSize: scale(22),
  fontFamily: Constants.FONTS.fontFamilyRegular,
  width: '100%',
  textAlign: 'center'
}

const TertiaryButtonDownStyle = {
  backgroundColor: Constants.ACCENT_MINT,
  width: Constants.BUTTON_WIDTH_1,
  height: scale(Constants.BUTTON_HEIGHT),
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: scale(3),
  borderColor: Constants.ACCENT_MINT,
  borderWidth: Constants.BUTTON_BORDER_STROKE
}

const TertiaryButtonTextDownStyle = {
  color: Constants.PRIMARY,
  fontSize: scale(22),
  fontFamily: Constants.FONTS.fontFamilyRegular,
  width: '100%',
  textAlign: 'center'
}

const DefaultButtonUpStyle = {
  position: 'relative',
  backgroundColor: Constants.BUTTON_DEFAULT_UP,
  width: Constants.BUTTON_WIDTH_1,
  height: scale(Constants.BUTTON_HEIGHT),
  alignItems: 'center',
  justifyContent: 'space-around',
  borderColor: Constants.BUTTON_DEFAULT_UP_TEXT,
  borderWidth: Constants.BUTTON_BORDER_STROKE,
  borderRadius: scale(Constants.BUTTON_BORDER_RADIUS)
}

const DefaultWidthButtonUpStyle = {
  ...DefaultButtonUpStyle,
  width: Constants.BUTTON_100_PERCENT
}

const DefaultButtonUpTextStyle = {
  position: 'relative',
  color: Constants.BUTTON_DEFAULT_UP_TEXT,
  fontSize: scale(Constants.FONTS.defaultButtonTextSize),
  fontFamily: Constants.FONTS.fontFamilyRegular,
  width: '100%',
  textAlign: 'center'
}
const DefaultButtonDownTextStyle = {
  position: 'relative',
  color: Constants.BUTTON_DEFAULT_DOWN_TEXT,
  fontSize: scale(Constants.FONTS.defaultButtonTextSize),
  fontFamily: Constants.FONTS.fontFamilyRegular,
  width: '100%',
  textAlign: 'center'
}

const DefaultButtonDownStyle = {
  position: 'relative',
  backgroundColor: Constants.BUTTON_DEFAULT_UP,
  width: Constants.BUTTON_WIDTH_1,
  height: scale(Constants.BUTTON_HEIGHT),
  alignItems: 'center',
  justifyContent: 'space-around',
  borderColor: Constants.BUTTON_DEFAULT_DOWN_TEXT,
  borderWidth: Constants.BUTTON_BORDER_STROKE,
  borderRadius: scale(Constants.BUTTON_BORDER_RADIUS)
}

const DefaultWidthButtonDownStyle = {
  ...DefaultButtonDownStyle,
  width: Constants.BUTTON_100_PERCENT
}

const TextOnlyButtonUpStyle = {
  backgroundColor: Constants.TRANSPARENT,
  padding: scale(10)
}

const TextOnlyButtonTextUpStyle = {
  color: Constants.SECONDARY,
  fontSize: scale(Constants.FONTS.defaultButtonTextSize),
  fontFamily: Constants.FONTS.fontFamilyRegular,
  width: '100%',
  textAlign: 'center'
}

const TextOnlyButtonDownStyle = {
  backgroundColor: Constants.TRANSPARENT,
  padding: scale(10)
}

const TextOnlyButtonTextDownStyle = {
  color: Constants.PRIMARY,
  fontSize: scale(Constants.FONTS.defaultButtonTextSize),
  fontFamily: Constants.FONTS.fontFamilyRegular,
  width: '100%',
  textAlign: 'center'
}

const IconButtonStyle = {
  container: {
    width: 40,
    height: scale(40),
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icon: {
    color: Constants.WHITE
  },
  iconPressed: {
    color: Constants.GRAY_2
  },
  iconSize: scale(36),
  underlayColor: Constants.TRANSPARENT
}

const TextAndIconButtonStyle = {
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  centeredContent: {
    width: '100%',
    alignItems: 'center'
  },
  inner: {
    position: 'relative',
    flexDirection: 'row'
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  iconContainer: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    color: Constants.WHITE,
    fontSize: scale(20)
  },
  textPressed: {
    color: Constants.GRAY_2,
    fontSize: scale(20)
  },
  icon: {
    color: Constants.WHITE
  },
  iconPressed: {
    color: Constants.GRAY_2
  },
  iconSize: scale(25),
  underlayColor: Constants.TRANSPARENT
}
const TextAndIconButtonAlignEdgesStyle = {
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: Constants.GRAY_1,
    borderBottomWidth: 2
  },
  centeredContent: {
    width: '100%'
    // alignItems: 'center'
  },
  inner: {
    position: 'relative',
    flexDirection: 'row'
  },
  textContainer: {
    flex: 17,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  iconContainer: {
    flex: 3,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around'
  },
  text: {
    color: Constants.GRAY_2,
    fontSize: scale(18)
  },
  textPressed: {
    color: Constants.GRAY_1,
    fontSize: scale(18)
  },
  icon: {
    color: Constants.GRAY_2
  },
  iconPressed: {
    color: Constants.GRAY_1
  },
  iconSize: scale(25),
  underlayColor: Constants.TRANSPARENT
}

const PrimaryButtonUpScaledStyle = {
  position: 'relative',
  backgroundColor: Constants.BUTTON_PRIMARY_UP,
  width: Constants.BUTTON_WIDTH_1,
  height: scale(Constants.BUTTON_HEIGHT),
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: scale(Constants.BUTTON_BORDER_RADIUS)
}
const PrimaryWidthButtonUpScaledStyle = {
  ...PrimaryButtonUpStyle,
  width: Constants.BUTTON_100_PERCENT
}
const PrimaryButtonUpTextScaledStyle = {
  position: 'relative',
  color: Constants.WHITE,
  fontSize: scale(Constants.FONTS.defaultButtonTextSize),
  fontFamily: Constants.FONTS.fontFamilyRegular,
  width: '100%',
  textAlign: 'center'
}
const PrimaryButtonDownTextScaledStyle = {
  position: 'relative',
  color: Constants.WHITE,
  fontSize: scale(Constants.FONTS.defaultButtonTextSize),
  fontFamily: Constants.FONTS.fontFamilyRegular,
  width: '100%',
  textAlign: 'center'
}
const PrimaryButtonDownScaledStyle = {
  position: 'relative',
  backgroundColor: Constants.BUTTON_PRIMARY_DOWN,
  width: Constants.BUTTON_WIDTH_1,
  height: scale(Constants.BUTTON_HEIGHT),
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: scale(Constants.BUTTON_BORDER_RADIUS)
}
const PrimaryWidthButtonDownScaledStyle = {
  ...PrimaryButtonDownStyle,
  width: Constants.BUTTON_100_PERCENT
}

const TextOnlyButtonUpScaledStyle = {
  backgroundColor: Constants.TRANSPARENT,
  padding: scale(10)
}

const TextOnlyButtonTextUpScaledStyle = {
  color: Constants.SECONDARY,
  fontSize: scale(Constants.FONTS.defaultButtonTextSize),
  fontFamily: Constants.FONTS.fontFamilyRegular,
  width: '100%',
  textAlign: 'center'
}

const TextOnlyButtonDownScaledStyle = {
  backgroundColor: Constants.TRANSPARENT,
  padding: scale(10)
}

const TextOnlyButtonTextDownScaledStyle = {
  color: Constants.PRIMARY,
  fontSize: scale(Constants.FONTS.defaultButtonTextSize),
  fontFamily: Constants.FONTS.fontFamilyRegular,
  width: '100%',
  textAlign: 'center'
}

const TextAndIconButtonScaledStyle = {
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  centeredContent: {
    width: '100%',
    alignItems: 'center'
  },
  inner: {
    position: 'relative',
    flexDirection: 'row'
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  iconContainer: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    color: Constants.WHITE,
    fontSize: scale(20)
  },
  textPressed: {
    color: Constants.GRAY_2,
    fontSize: scale(20)
  },
  icon: {
    color: Constants.WHITE
  },
  iconPressed: {
    color: Constants.GRAY_2
  },
  iconSize: scale(25),
  underlayColor: Constants.TRANSPARENT
}

export { TextAndIconButtonAlignEdgesStyle }
export { TextAndIconButtonStyle }
export { IconButtonStyle }
export { PrimaryButtonUpStyle }
export { PrimaryWidthButtonUpStyle }
export { PrimaryButtonUpTextStyle }
export { PrimaryButtonDownTextStyle }
export { PrimaryButtonDownStyle }
export { PrimaryWidthButtonDownStyle }
export { SecondaryButtonUpStyle }
export { SecondaryButtonUpTextStyle }
export { SecondaryButtonDownStyle }
export { SecondaryButtonDownTextStyle }
export { TertiaryButtonUpStyle }
export { TertiaryButtonTextUpStyle }
export { TertiaryButtonDownStyle }
export { TertiaryButtonTextDownStyle }
export { DefaultButtonUpStyle }
export { DefaultWidthButtonUpStyle }
export { DefaultButtonUpTextStyle }
export { DefaultButtonDownStyle }
export { DefaultWidthButtonDownStyle }
export { DefaultButtonDownTextStyle }
export { TextOnlyButtonUpStyle }
export { TextOnlyButtonTextUpStyle }
export { TextOnlyButtonDownStyle }
export { TextOnlyButtonTextDownStyle }

export { PrimaryButtonUpScaledStyle }
export { PrimaryWidthButtonUpScaledStyle }
export { PrimaryButtonUpTextScaledStyle }
export { PrimaryButtonDownTextScaledStyle }
export { PrimaryButtonDownScaledStyle }
export { PrimaryWidthButtonDownScaledStyle }
export { TextOnlyButtonUpScaledStyle }
export { TextOnlyButtonTextUpScaledStyle }
export { TextOnlyButtonDownScaledStyle }
export { TextOnlyButtonTextDownScaledStyle }
export { TextAndIconButtonScaledStyle }
