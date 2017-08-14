import * as Colors from '../../constants/Colors'
import { vs, fontSize } from '../../util'
import * as Styles from '../'

const HeaderContainerStyle = {
  container: {
    position: 'relative',
    height: vs(65),
    width: '100%',
    backgroundColor: Colors.PRIMARY,
    flexDirection: 'row'
  },
  left: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  center: {
    flex: 3,
    justifyContent: 'flex-end',
    paddingBottom: 15
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end' // ,
    // alignItems: 'center'
  },
  textStyle: {
    fontSize: fontSize(20),
    width: '100%',
    textAlign: 'center'
  },
  textButton: {
    upStyle: { ...Styles.TextOnlyButtonUpStyle, width: '100%' },
    upTextStyle: { ...Styles.TextOnlyButtonTextUpStyle, width: '100%', color: Colors.WHITE },
    downTextStyle: { ...Styles.TextOnlyButtonTextDownStyle, width: '100%', color: Colors.SECONDARY },
    downStyle: { ...Styles.TextOnlyButtonDownStyle, width: '100%', height: vs(50) }
  }
}

export { HeaderContainerStyle }
