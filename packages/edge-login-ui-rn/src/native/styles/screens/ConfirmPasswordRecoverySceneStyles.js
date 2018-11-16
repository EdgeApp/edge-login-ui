// @flow

import * as Constants from '../../../common/constants'
import * as Styles from '../'

const ConfirmPasswordRecoverySceneStyles = {
  screen: { ...Styles.ScreenStyle, alignItems: 'center' },
  header: {
    ...Styles.HeaderContainerScaledStyle,
    backgroundColor: Constants.PRIMARY
  },
  submitButton: {
    upStyle: Styles.PrimaryWidthButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryWidthButtonDownStyle
  },
  disableButton: {
    upStyle: Styles.DefaultWidthButtonUpStyle,
    upTextStyle: Styles.DefaultButtonUpTextStyle,
    downTextStyle: Styles.DefaultButtonDownTextStyle,
    downStyle: Styles.DefaultWidthButtonDownStyle
  },
  buttonContainer: {
    width: '90%',
    alignItems: 'center'
    // height: THEME.BUTTONS.HEIGHT
  },
  questionText: {
    color: Constants.GRAY_2,
    width: '90%',
    fontSize: 15,
    paddingBottom: 10
  },
  answerText: {
    color: Constants.GRAY_1,
    width: '90%',
    fontSize: 15,
    textAlign: 'left',
    paddingBottom: 10
  },
  shim: {
    height: 20
  }
}

export { ConfirmPasswordRecoverySceneStyles }
