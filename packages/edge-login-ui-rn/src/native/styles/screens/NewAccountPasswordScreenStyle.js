// @flow

import * as Styles from '../'
import { scale } from '../../../common/util/scaling.js'

const NewAccountPasswordScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerStyle,
  mainScrollView: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  scrollViewContentContainer: {
    alignItems: 'center'
  },
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center',
    flex: 1
  },
  innerView: { ...Styles.InnerView, alignItems: 'center' },
  status: Styles.PasswordStatusStyle,
  nextButton: {
    upStyle: Styles.PrimaryButtonUpScaledStyle,
    upTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downStyle: Styles.PrimaryButtonDownScaledStyle
  },
  inputBox: {
    ...Styles.MaterialInputOnWhite
  },

  inputShim: { ...Styles.Shim, height: scale(30) },
  modal: Styles.SkipModalStyle
}

export { NewAccountPasswordScreenStyle }
