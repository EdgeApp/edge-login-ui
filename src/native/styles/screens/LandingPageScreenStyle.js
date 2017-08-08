import * as Styles from '../'
import * as Colors from '../../../common/constants/Colors'

const LandingPageScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {...Styles.BackgroundScreenImageStyle, alignItems: 'center'},
  featureBox: {
    position: 'relative',
    top: 71,
    width: 260,
    height: 306,
    backgroundColor: Colors.OVERLAY_BOX,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  featureBoxIconHeader: {

  },
  featureBoxBody: {

  },
  createButton: {
    upStyle: Styles.PrimaryButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryButtonDownStyle
  },
  loginButton: {
    upStyle: Styles.PrimaryButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryButtonDownStyle
  }
}

export {LandingPageScreenStyle}
