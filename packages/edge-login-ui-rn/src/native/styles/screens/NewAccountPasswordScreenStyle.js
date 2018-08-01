// @flow

import { scale } from '../../../common/util/scaling.js'
import * as Styles from '../'

const NewAccountPasswordScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: Styles.HeaderContainerScaledStyle,
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
  passwordShim: { ...Styles.Shim, height: scale(15) },
  inputShim: { ...Styles.Shim, height: scale(50) },
  modal: Styles.SkipModalStyle
}

export { NewAccountPasswordScreenStyle }
