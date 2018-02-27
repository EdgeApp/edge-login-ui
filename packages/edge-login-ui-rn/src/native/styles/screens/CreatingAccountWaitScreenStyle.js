// @flow
import * as Styles from '../'
import * as Colors from '../../../common/constants/Colors'
import * as Constants from '../../../common/constants/'

const CreatingAccountWaitScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerStyle,
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center'
  },
  topPad: {
    width: '100%',
    height: 35
  },
  iconContianer: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  headlineConainer: {
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  bodyCopyContainer: {
    width: '100%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  encriptingContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  headlineText: {
    fontSize: 17,
    fontFamily: Constants.FONTS.fontFamilyRegular
  },
  bodyText: {
    fontSize: 14,
    fontFamily: Constants.FONTS.fontFamilyRegular,
    color: Colors.GRAY_2
  }
}

export { CreatingAccountWaitScreenStyle }
