import * as Styles from '../'
import * as Colors from '../../../common/constants/Colors'
import {vs, fontSize} from '../../../common/util'
const CreatingAccountWaitScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerStyle,
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center'
  },
  topPad: {
    width: '100%',
    height: vs(35)
  },
  iconContianer: {
    width: '100%',
    height: vs(80),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  headlineConainer: {
    width: '100%',
    height: vs(55),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  bodyCopyContainer: {
    width: '100%',
    height: vs(35),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  encriptingContainer: {
    width: '100%',
    height: vs(50),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  headlineText: {
    fontSize: fontSize(17)
  },
  bodyText: {
    fontSize: fontSize(14),
    color: Colors.GRAY_2
  }
}

export { CreatingAccountWaitScreenStyle }
