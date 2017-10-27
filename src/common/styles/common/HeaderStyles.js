import * as Constants from '../../constants/'
import { vs, fontSize } from '../../util'
import * as Styles from '../'

const HeaderContainerStyle = {
  container: {
    position: 'relative',
    height: Constants.HEADER_HEIGHT,
    width: '100%',
    backgroundColor: Constants.TRANSPARENT,
    flexDirection: 'row'
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
    fontSize: fontSize(17),
    width: '100%',
    textAlign: 'center',
    color: Constants.WHITE
  },
  subHeadText: {
    fontSize: fontSize(11),
    width: '100%',
    textAlign: 'center',
    color: Constants.ACCENT_ORANGE
  },
  textButton: {
    upStyle: { ...Styles.TextOnlyButtonUpStyle, width: '100%' },
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      width: '100%',
      color: Constants.WHITE,
      fontSize: fontSize(12)
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      width: '100%',
      color: Constants.SECONDARY,
      fontSize: fontSize(12)
    },
    downStyle: {
      ...Styles.TextOnlyButtonDownStyle,
      width: '100%',
      height: vs(50)
    }
  }
}

export { HeaderContainerStyle }
