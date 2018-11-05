// @flow

import { Dimensions } from 'react-native'

import * as Constants from '../../constants/'
import { scale } from '../../util/scaling.js'
import * as Styles from '../'

const OFFSET_HACK = -19

const screenDimensions = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
}
const FullScreenModalStyle = {
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
  modalBox: {
    width: '100%',
    height: '100%',
    backgroundColor: Constants.WHITE
  }
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
  modalBox: {
    top: screenDimensions.height / 8,
    left: screenDimensions.width / 16,
    width: screenDimensions.width * 7 / 8,
    borderRadius: scale(3),
    borderWidth: 2,
    borderColor: Constants.GRAY_2,
    alignItems: 'stretch',
    position: 'absolute',
    // height: (screenDimensions.height) / 3,
    backgroundColor: Constants.WHITE,
    padding: 10,
    paddingTop: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  exitRow: {
    alignItems: 'flex-end',
    position: 'relative',
    minHeight: 20
  },
  modalHeaderIconWrapBottom: {
    position: 'absolute',
    left: screenDimensions.width / 2 - 27,
    top: screenDimensions.height / 8 - 28,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: Constants.PRIMARY,
    backgroundColor: Constants.WHITE,
    height: 54,
    width: 54,
    zIndex: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  closeIconButton: {
    ...Styles.IconButtonStyle,
    iconSize: 18,
    icon: { ...Styles.IconButtonStyle.icon, color: Constants.GRAY_2 },
    iconPressed: { ...Styles.IconButtonStyle.icon, color: Constants.GRAY_1 }
  },
  iconSize: 32,
  iconStyle: {
    color: Constants.PRIMARY,
    backgroundColor: Constants.TRANSPARENT,
    overflow: 'hidden'
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
    fontSize: scale(16)
  },
  modalTopSubtext: {
    fontSize: scale(14),
    color: Constants.GRAY_1,
    textAlign: 'center',
    paddingTop: 4
  },
  modalMiddleText: {
    fontSize: scale(Constants.FONTS.defaultFontSize),
    color: Constants.GRAY_1,
    textAlign: 'center',
    paddingTop: 4
  },
  modalMiddle: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: scale(4)
  },
  buttonsWrap: {
    position: 'relative',
    marginTop: scale(10),
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  activityWrap: {
    position: 'relative',
    marginTop: scale(20),
    flex: 1,
    height: Constants.BUTTON_HEIGHT,
    width: '100%',
    flexDirection: 'column',
    aligItems: 'center',
    justifyContent: 'space-around'
  },
  twoButtonConfig: {
    cancelButtonWrap: {
      position: 'relative',
      alignSelf: 'flex-start',
      width: '49%',
      height: scale(Constants.BUTTON_HEIGHT)
    },
    actionButtonWrap: {
      position: 'relative',
      alignSelf: 'flex-end',
      width: '49%',
      height: scale(Constants.BUTTON_HEIGHT),
      marginLeft: '2%'
    },
    actionButton: {
      up: {
        ...Styles.PrimaryButtonUpStyle,
        width: Constants.BUTTON_100_PERCENT
      },
      upText: Styles.PrimaryButtonUpTextStyle,
      down: {
        ...Styles.PrimaryButtonDownStyle,
        width: Constants.BUTTON_100_PERCENT
      },
      downText: Styles.PrimaryButtonDownTextStyle
    },
    cancelButton: {
      up: {
        ...Styles.SecondaryButtonUpStyle,
        width: Constants.BUTTON_100_PERCENT
      },
      upText: Styles.SecondaryButtonUpTextStyle,
      down: {
        ...Styles.SecondaryButtonDownStyle,
        width: Constants.BUTTON_100_PERCENT
      },
      downText: Styles.SecondaryButtonDownTextStyle
    }
  }
}
const StaticModalStyle = {
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
  touchOut: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: Constants.TRANSPARENT
  },
  modalBox: {
    top: screenDimensions.height / 4,
    left: screenDimensions.width / 8,
    width: screenDimensions.width * 3 / 4,
    alignItems: 'stretch',
    position: 'absolute',
    // height: (screenDimensions.height) / 3,
    backgroundColor: Constants.WHITE,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  header: {
    position: 'relative',
    height: Constants.STATIC_MODAL_HEADER_HEIGHT,
    width: '100%',
    backgroundColor: Constants.TRANSPARENT,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  bottom: {
    position: 'relative',
    width: '100%',
    backgroundColor: Constants.WHITE
  },
  bodyRow: {
    width: '100%',
    padding: scale(15)
  },
  shim: Styles.Shim.height,
  icon: {
    color: Constants.WHITE
  },
  iconSize: 36
}
export { StaticModalStyle }
export { ModalStyle }
export { FullScreenModalStyle }
