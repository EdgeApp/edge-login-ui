// @flow
import * as Constants from '../../constants/'
import { vs } from '../../util'
import * as Styles from '../'

const HeaderContainerStyle = {
  container: {
    position: 'relative',
    height: Constants.HEADER_HEIGHT,
    width: '100%',
    backgroundColor: Constants.TRANSPARENT,
    flexDirection: 'row',
    paddingVertical: 6
  },
  headerBackButtonStyle: {
    backButton: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    backIconStyle: {
      paddingLeft: 10,
      paddingRight: 5,
      paddingTop: 3,
      color: Constants.WHITE
    },
    sideText: {
      color: Constants.WHITE,
      fontSize: 18
    },
    icon: {
      color: Constants.WHITE,
      fontSize: 25
    },
    default: {
      backgroundColor: Constants.TRANSPARENT,
      color: Constants.WHITE
    }
  },
  left: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  center: {
    flex: 3,
    justifyContent: 'flex-end',
    paddingBottom: 5
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end' // ,
    // alignItems: 'center'
  },
  headlineText: {
    fontSize: 17,
    width: '100%',
    textAlign: 'center',
    color: Constants.WHITE
  },
  subHeadText: {
    fontSize: 11,
    width: '100%',
    textAlign: 'center',
    color: Constants.ACCENT_MINT
  },
  textButton: {
    upStyle: { ...Styles.TextOnlyButtonUpStyle, width: '100%' },
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      width: '100%',
      color: Constants.WHITE,
      fontSize: Constants.FONTS.defaultButtonTextSize
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      width: '100%',
      color: Constants.SECONDARY,
      fontSize: Constants.FONTS.defaultButtonTextSize
    },
    downStyle: {
      ...Styles.TextOnlyButtonDownStyle,
      width: '100%',
      height: vs(50)
    }
  }
}

export { HeaderContainerStyle }
