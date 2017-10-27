// import * as Styles from '../'
import * as Constants from '../../constants/'
import {
  Dimensions
} from 'react-native'

const screenDimensions = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
}

const TwoButtonModalDefaultStyle = {
  margins: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  modalBox: {
    top: (screenDimensions.height / 8),
    left: (screenDimensions.width / 8) - 20,
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
  }
}

export {TwoButtonModalDefaultStyle}
