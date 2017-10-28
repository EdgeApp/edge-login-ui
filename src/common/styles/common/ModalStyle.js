import * as Styles from '../'
import * as Constants from '../../constants/'
import { Dimensions } from 'react-native'

const OFFSET_HACK = -19

const screenDimensions = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
}

const ModalStyle = {
  container: {
    position: 'absolute',
    top: OFFSET_HACK,
    left: OFFSET_HACK,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.MODAL_BOX
  },
  /* margins: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  }, */
  modalBox: {
    top: screenDimensions.height / 8,
    left: screenDimensions.width / 8,
    width: screenDimensions.width * 3 / 4,
    borderRadius: 3,
    alignItems: 'stretch',
    position: 'absolute',
    // height: (screenDimensions.height) / 3,
    backgroundColor: Constants.WHITE,
    padding: 15,
    paddingTop: 25,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  exitRow: {
    alignItems: 'flex-end',
    position: 'relative',
    zIndex: 200
  },
  modalHeaderIconWrapBottom: {
    position: 'absolute',
    left: screenDimensions.width / 2 - 27,
    top: screenDimensions.height / 8 - 28,
    borderRadius: 27,
    backgroundColor: Constants.WHITE,
    height: 54,
    width: 54
  },
  modalHeaderIconWrapTop: {
    position: 'relative',
    top: 3,
    left: 3,
    borderRadius: 27,
    // backgroundColor: Constants.WHITE,
    zIndex: 100,
    elevation: 100,
    height: 48,
    width: 48
  },
  closeIconButton: {
    ...Styles.IconButtonStyle,
    iconSize: 18,
    icon: { ...Styles.IconButtonStyle.icon, color: Constants.GRAY_2 },
    iconPressed: { ...Styles.IconButtonStyle.icon, color: Constants.GRAY_1 }
  },
  iconSize: 36,
  iconStyle: {
    position: 'relative',
    color: Constants.PRIMARY,
    backgroundColor: Constants.TRANSPARENT,
    width: 48,
    height: 48
  },
  modalBody: {
    position: 'relative',
    justifyContent: 'space-between'
  },
  modalTopTextWrap: {
    padding: 10,
    paddingBottom: 4
  },
  modalTopText: {
    textAlign: 'center',
    color: Constants.PRIMARY,
    fontSize: 16
  },
  modalTopSubtext: {
    fontSize: 14,
    color: Constants.GRAY_1,
    textAlign: 'center',
    paddingTop: 4
  },
  modalMiddleText: {
    fontSize: Constants.DEFAULT_FONT_TEXT_SIZE,
    color: Constants.GRAY_1,
    textAlign: 'center',
    paddingTop: 4
  },
  modalMiddle: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 4
  },
  buttonsWrap: {
    position: 'relative',
    marginTop: 4,
    flex: 1,
    height: Constants.BUTTON_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  twoButtonConfig: {
    cancelButtonWrap: {
      position: 'relative',
      alignSelf: 'flex-start',
      width: '49%',
      height: Constants.BUTTON_HEIGHT
    },
    actionButtonWrap: {
      position: 'relative',
      alignSelf: 'flex-end',
      width: '49%',
      height: Constants.BUTTON_HEIGHT,
      marginLeft: '2%'
    },
    actionButton: {
      up: {...Styles.PrimaryButtonUpStyle, width: Constants.BUTTON_100_PERCENT},
      upText: Styles.PrimaryButtonUpTextStyle,
      down: {...Styles.PrimaryButtonDownStyle, width: Constants.BUTTON_100_PERCENT},
      downText: Styles.PrimaryButtonDownTextStyle
    },
    cancelButton: {
      up: {...Styles.SecondaryButtonUpStyle, width: Constants.BUTTON_100_PERCENT},
      upText: Styles.SecondaryButtonUpTextStyle,
      down: {...Styles.SecondaryButtonDownStyle, width: Constants.BUTTON_100_PERCENT},
      downText: Styles.SecondaryButtonDownTextStyle
    }
  }
}

export { ModalStyle }
