import * as Styles from '../'
import * as Colors from '../../../common/constants/Colors'
import { hs, vs } from '../../../common/util'
const LandingPageScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {
    ...Styles.BackgroundScreenImageStyle,
    alignItems: 'center'
  },
  featureBox: {
    position: 'relative',
    top: vs(71),
    width: hs(260),
    height: vs(306),
    backgroundColor: Colors.OVERLAY_BOX
  },
  logoHeader: Styles.LogoHeaderStyle,
  featureBoxContent: {
    // height: vs(186), 306- 125 - remaining space.
    width: '100%',
    height: vs(186),
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  featureBoxDescription: {
    // height: vs(186), 306- 125 - remaining space.
    width: '100%',
    justifyContent: 'flex-end'
  },
  featureBoxButtons: {
    // height: vs(186),
    justifyContent: 'flex-end'
  },
  createButton: {
    upStyle: Styles.PrimaryButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryButtonDownStyle
  },
  loginButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: Styles.TextOnlyButtonTextUpStyle,
    downTextStyle: Styles.TextOnlyButtonDownStyle,
    downStyle: Styles.TextOnlyButtonTextDownStyle
  }
}

export { LandingPageScreenStyle }
