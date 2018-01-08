import * as Styles from '../'
import * as Constants from '../../../common/constants'
// import {Image} from 'react-native'

const RecoverPasswordSceneStyles = {
  screen: { ...Styles.ScreenStyle },
  header: { ...Styles.HeaderContainerStyle, backgroundColor: Constants.PRIMARY },
  /* gradient: {
    height: THEME.HEADER
  }, */
  body: {
    padding: 18
  },
  questionRow: {
    height: 50,
    width: '100%'
  },
  answerRow: {
    width: '100%',
    height: 100
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center'
    // height: THEME.BUTTONS.HEIGHT
  },
  input: {...Styles.MaterialInputOnWhite,
    errorColor: Constants.GRAY_2,
    baseColor: Constants.GRAY_2,
    textColor: Constants.GRAY_2,
    titleTextStyle: {
      color: Constants.GRAY_2
    },
    affixTextStyle: {
      color: Constants.GRAY_2
    },
    container: {...Styles.MaterialInputOnWhite.container, width: '100%'}
  },
  inputError: {...Styles.MaterialInputOnWhite,
    errorColor: Constants.ACCENT_RED,
    baseColor: Constants.ACCENT_RED,
    textColor: Constants.ACCENT_RED,
    titleTextStyle: {
      color: Constants.ACCENT_RED
    },
    affixTextStyle: {
      color: Constants.ACCENT_RED
    },
    container: {...Styles.MaterialInputOnWhite.container, width: '100%'}
  },
  shim: {
    height: 20
  },
  textIconButton: Styles.TextAndIconButtonAlignEdgesStyle,
  textIconButtonErrorError: {...Styles.TextAndIconButtonAlignEdgesStyle,
    text: {...Styles.TextAndIconButtonAlignEdgesStyle.text, color: Constants.ACCENT_RED},
    icon: {...Styles.TextAndIconButtonAlignEdgesStyle.icon, color: Constants.ACCENT_RED}
  },
  nextButton: {
    upStyle: Styles.PrimaryButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryButtonDownStyle
  },
  questionsList: {
    width: '100%',
    height: 400,
    borderColor: Constants.GRAY_3,
    borderWidth: 1
  },
  listItem: Styles.ListItemTextOnly
}

export {RecoverPasswordSceneStyles}
