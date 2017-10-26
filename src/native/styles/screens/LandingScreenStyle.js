import * as Styles from '../'
import * as Constants from '../../../common/constants/Colors'
import { vs, fontSize } from '../../../common/util'
const LandingScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {
    ...Styles.BackgroundScreenImageStyle,
    alignItems: 'center'
  },
  featureBox: {
    position: 'relative',
    top: vs(71),
    width: '100%',
    height: vs(306)
  },
  logoHeader: Styles.LogoHeaderStyle,
  featureBoxContent: {
    // height: vs(186), 306- 125 - remaining space.
    width: '100%',
    flexDirection: 'column',
    height: vs(186),
    alignItems: 'center',
    justifyContent: 'flex-start'

  },
  featureBoxDescription: {
    // height: vs(186), 306- 125 - remaining space.
    width: '100%',
    justifyContent: 'flex-end'
  },
  featureBoxButtons: {
    // height: vs(186),
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  shim: {
    height: 20
  },
  tagText: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    color: Constants.WHITE,
    backgroundColor: Constants.TRANSPARENT,
    textAlign: 'center'
  },
  createButton: {
    upStyle: Styles.TertiaryButtonUpStyle,
    upTextStyle: Styles.TertiaryButtonTextUpStyle,
    downTextStyle: Styles.TertiaryButtonTextUpStyle,
    downStyle: Styles.TertiaryButtonDownStyle
  },
  loginButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {...Styles.TextOnlyButtonTextUpStyle, fontSize: fontSize(14), color: Constants.WHITE},
    downTextStyle: {...Styles.TextOnlyButtonTextDownStyle, fontSize: fontSize(14), color: Constants.WHITE},
    downStyle: Styles.TextOnlyButtonDownStyle
  }
}

export { LandingScreenStyle }
