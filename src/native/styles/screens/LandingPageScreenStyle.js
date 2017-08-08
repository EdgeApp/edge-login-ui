import * as Styles from '../'
import * as Colors from '../../../common/constants/Colors'

const LandingPageScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {...Styles.BackgroundScreenImageStyle, justifyContent: 'space-around', alignItems: 'center'},
  featureBox: {
    position: 'relative',
    width: '80%',
    height: '60%',
    backgroundColor: Colors.OVERLAY_BOX,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  featureBoxIconHeader: {

  },
  featureBoxBody: {

  }
}

export {LandingPageScreenStyle}
