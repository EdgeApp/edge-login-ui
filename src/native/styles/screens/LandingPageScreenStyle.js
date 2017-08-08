import * as Styles from '../'

const LandingPageScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {...Styles.BackgroundScreenImageStyle, justifyContent: 'space-around', alignItems: 'center'},
  featureBox: {
    position: 'relative',
    width: '80%',
    height: '80%',
    backgroundColor: '#FFFFFF'
  }
}

export {LandingPageScreenStyle}
