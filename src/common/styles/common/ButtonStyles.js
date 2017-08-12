import * as Colors from '../../constants/Colors'
import { hs, vs } from '../../util'
const PrimaryButtonUpStyle = {
  backgroundColor: Colors.BUTTON_PRIMARY_UP,
  width: hs(220),
  height: vs(50),
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: hs(3)
}
const PrimaryButtonUpTextStyle = {
  color: Colors.WHITE
}

const PrimaryButtonDownStyle = {
  backgroundColor: Colors.BUTTON_PRIMARY_DOWN
}

const SecondaryButtonUpStyle = {

}

const SecondaryButtonDownStyle = {

}

const TertiaryButtonUpStyle = {

}

const TertiaryButtonTextUpStyle = {

}

const TertiaryButtonDownStyle = {

}

const TertiaryButtonTextDownStyle = {

}

const TextOnlyButtonUpStyle = {
  backgroundColor: Colors.TRANSPARENT,
  width: 220,
  height: 50,
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: 3
}

const TextOnlyButtonTextUpStyle = {
  color: Colors.SECONDARY
}

const TextOnlyButtonDownStyle = {
  backgroundColor: Colors.TRANSPARENT,
  width: 220,
  height: 50,
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: 3
}

const TextOnlyButtonTextDownStyle = {
  color: Colors.PRIMARY
}

export {PrimaryButtonUpStyle}
export {PrimaryButtonUpTextStyle}
export {PrimaryButtonDownStyle}
export {SecondaryButtonUpStyle}
export {SecondaryButtonDownStyle}
export {TertiaryButtonUpStyle}
export {TertiaryButtonTextUpStyle}
export {TertiaryButtonDownStyle}
export {TertiaryButtonTextDownStyle}
export {TextOnlyButtonUpStyle}
export {TextOnlyButtonTextUpStyle}
export {TextOnlyButtonDownStyle}
export {TextOnlyButtonTextDownStyle}

