import * as Colors from '../../constants/Colors'
import { hs, vs, fontSize } from '../../util'
const PrimaryButtonUpStyle = {
  backgroundColor: Colors.BUTTON_PRIMARY_UP,
  width: hs(220),
  height: vs(50),
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: hs(3)
}
const PrimaryButtonUpTextStyle = {
  color: Colors.WHITE,
  fontSize: fontSize(17),
  width: '100%',
  textAlign: 'center'
}

const PrimaryButtonDownStyle = {
  backgroundColor: Colors.BUTTON_PRIMARY_DOWN
}

const SecondaryButtonUpStyle = {}

const SecondaryButtonDownStyle = {}

const TertiaryButtonUpStyle = {}

const TertiaryButtonTextUpStyle = {}

const TertiaryButtonDownStyle = {}

const TertiaryButtonTextDownStyle = {}

const TextOnlyButtonUpStyle = {
  backgroundColor: Colors.TRANSPARENT,
  padding: 10
}

const TextOnlyButtonTextUpStyle = {
  color: Colors.SECONDARY,
  fontSize: fontSize(17),
  width: '100%',
  textAlign: 'center'
}

const TextOnlyButtonDownStyle = {
  backgroundColor: Colors.TRANSPARENT,
  padding: 10
}

const TextOnlyButtonTextDownStyle = {
  color: Colors.PRIMARY,
  fontSize: fontSize(17),
  width: '100%',
  textAlign: 'center'
}

export { PrimaryButtonUpStyle }
export { PrimaryButtonUpTextStyle }
export { PrimaryButtonDownStyle }
export { SecondaryButtonUpStyle }
export { SecondaryButtonDownStyle }
export { TertiaryButtonUpStyle }
export { TertiaryButtonTextUpStyle }
export { TertiaryButtonDownStyle }
export { TertiaryButtonTextDownStyle }
export { TextOnlyButtonUpStyle }
export { TextOnlyButtonTextUpStyle }
export { TextOnlyButtonDownStyle }
export { TextOnlyButtonTextDownStyle }
