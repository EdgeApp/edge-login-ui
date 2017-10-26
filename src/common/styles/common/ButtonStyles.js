import * as Constants from '../../constants/'
import { hs, fontSize } from '../../util'
const PrimaryButtonUpStyle = {
  backgroundColor: Constants.BUTTON_PRIMARY_UP,
  width: Constants.BUTTON_WIDTH_1,
  height: Constants.BUTTON_HEIGHT,
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: Constants.BUTTON_BORDER_RADIUS
}
const PrimaryButtonUpTextStyle = {
  color: Constants.WHITE,
  fontSize: Constants.BUTTON_TEXT_SIZE,
  width: '100%',
  textAlign: 'center'
}

const PrimaryButtonDownStyle = {
  backgroundColor: Constants.BUTTON_PRIMARY_DOWN
}

const SecondaryButtonUpStyle = {
  backgroundColor: Constants.BUTTON_SECONDARY_UP,
  width: Constants.BUTTON_WIDTH_1,
  height: Constants.BUTTON_HEIGHT,
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: Constants.BUTTON_BORDER_RADIUS
}

const SecondaryButtonDownStyle = {
  backgroundColor: Constants.BUTTON_SECONDARY_DOWN
}
const SecondaryButtonUpTextStyle = {
  color: Constants.WHITE,
  fontSize: Constants.BUTTON_TEXT_SIZE,
  width: '100%',
  textAlign: 'center'
}

const TertiaryButtonUpStyle = {
  backgroundColor: Constants.TRANSPARENT,
  width: Constants.BUTTON_WIDTH_1,
  height: Constants.BUTTON_HEIGHT,
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: hs(3),
  borderColor: Constants.ACCENT_MINT,
  borderWidth: Constants.BUTTON_BORDER_STROKE
}

const TertiaryButtonTextUpStyle = {
  color: Constants.ACCENT_MINT,
  fontSize: Constants.BUTTON_TEXT_SIZE,
  width: '100%',
  textAlign: 'center'
}

const TertiaryButtonDownStyle = {
  backgroundColor: Constants.ACCENT_MINT,
  width: Constants.BUTTON_WIDTH_1,
  height: Constants.BUTTON_HEIGHT,
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: hs(3),
  borderColor: Constants.ACCENT_MINT,
  borderWidth: Constants.BUTTON_BORDER_STROKE
}

const TertiaryButtonTextDownStyle = {
  color: Constants.PRIMARY,
  fontSize: Constants.BUTTON_TEXT_SIZE,
  width: '100%',
  textAlign: 'center'
}

const TextOnlyButtonUpStyle = {
  backgroundColor: Constants.TRANSPARENT,
  padding: 10
}

const TextOnlyButtonTextUpStyle = {
  color: Constants.SECONDARY,
  fontSize: fontSize(17),
  width: '100%',
  textAlign: 'center'
}

const TextOnlyButtonDownStyle = {
  backgroundColor: Constants.TRANSPARENT,
  padding: 10
}

const TextOnlyButtonTextDownStyle = {
  color: Constants.PRIMARY,
  fontSize: fontSize(17),
  width: '100%',
  textAlign: 'center'
}

export { PrimaryButtonUpStyle }
export { PrimaryButtonUpTextStyle }
export { PrimaryButtonDownStyle }
export { SecondaryButtonUpStyle }
export { SecondaryButtonUpTextStyle }
export { SecondaryButtonDownStyle }
export { TertiaryButtonUpStyle }
export { TertiaryButtonTextUpStyle }
export { TertiaryButtonDownStyle }
export { TertiaryButtonTextDownStyle }
export { TextOnlyButtonUpStyle }
export { TextOnlyButtonTextUpStyle }
export { TextOnlyButtonDownStyle }
export { TextOnlyButtonTextDownStyle }
