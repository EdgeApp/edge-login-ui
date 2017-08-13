import * as Styles from '../'
import * as Colors from '../../../common/constants/Colors'
import {hs, vs} from '../../../common/util'
const LandingPageScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {...Styles.BackgroundScreenImageStyle, alignItems: 'center'},
  featureBox: {
    position: 'relative',
    top: vs(71),
    width: hs(260),
    height: vs(306),
    backgroundColor: Colors.OVERLAY_BOX,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  featureBoxIconHeader: {
    // height: vs(120),
    flex: 1
  },
  featureBoxDescription: {
    // height: vs(186),
    flex: 2,
    width: '100%',
    justifyContent: 'flex-end'
  },
  featureBoxButtons: {
    // height: vs(186),
    flex: 1,
    justifyContent: 'flex-end'
  },
  logo: Styles.LogoImageStyles,
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

export {LandingPageScreenStyle}
