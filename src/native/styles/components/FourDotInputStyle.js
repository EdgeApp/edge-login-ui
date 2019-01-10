// @flow

import * as Colors from '../../../common/constants/Colors.js'
import { scale } from '../../../common/util/scaling.js'

const FourDotInputStyle = {
  // used for logging *back in* with PIN
  container: {
    paddingTop: 12,
    width: '100%',
    height: scale(86)
  },
  interactiveContainer: {
    height: scale(40),
    width: '100%',
    alignItems: 'center'
  },
  errorContainer: {
    height: scale(40),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  dotContainer: {
    height: '100%',
    width: scale(190),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  errorText: {
    color: Colors.ACCENT_RED,
    backgroundColor: Colors.TRANSPARENT,
    textAlign: 'center',
    fontSize: scale(12)
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0
  },
  circle: {
    borderWidth: 2,
    borderColor: Colors.WHITE,
    borderRadius: scale(15),
    height: scale(30),
    width: scale(30)
  },
  circleSected: {
    backgroundColor: Colors.ACCENT_MINT,
    borderWidth: scale(2),
    borderColor: Colors.WHITE,
    borderRadius: scale(15),
    height: scale(30),
    width: scale(30)
  }
}
const FourDotInputDarkStyle = {
  container: {
    paddingTop: 30,
    width: 200,
    height: 90
  },
  interactiveContainer: {
    flex: 1,
    width: '100%'
  },
  errorContainer: {
    flex: 1,
    width: '100%'
  },
  dotContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  errorText: {
    width: '100%',
    height: 40,
    textAlign: 'center',
    color: Colors.ACCENT_RED,
    padding: 5
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0
  },
  circle: {
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    height: 30,
    width: 30
  },
  circleSected: {
    backgroundColor: Colors.SECONDARY,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    height: 30,
    width: 30
  }
}

const FourDotInputDarkScaledStyle = {
  // for new account PIN
  container: {
    paddingTop: scale(36),
    width: scale(200),
    height: scale(80)
  },
  interactiveContainer: {
    height: scale(40),
    width: '100%',
    alignItems: 'center'
  },
  errorContainer: {
    width: '100%',
    height: scale(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
  dotContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  errorText: {
    width: '100%',
    textAlign: 'center',
    color: Colors.ACCENT_RED,
    fontSize: scale(14),
    paddingTop: scale(15)
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0
  },
  circle: {
    borderWidth: scale(2),
    borderColor: Colors.PRIMARY,
    borderRadius: scale(15),
    height: scale(30),
    width: scale(30)
  },
  circleSected: {
    backgroundColor: Colors.SECONDARY,
    borderWidth: scale(2),
    borderColor: Colors.PRIMARY,
    borderRadius: scale(15),
    height: scale(30),
    width: scale(30)
  }
}

export { FourDotInputDarkScaledStyle }
export { FourDotInputDarkStyle }
export { FourDotInputStyle }
