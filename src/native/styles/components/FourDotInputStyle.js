import * as Colors from '../../../common/constants/Colors.js'
// import { vs } from '../../../common/util'

const FourDotInputStyle = {
  container: {
    width: 200,
    height: 60
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
    textAlign: 'center',
    color: Colors.ACCENT_RED,
    backgroundColor: Colors.TRANSPARENT,
    padding: 20
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
    borderRadius: 15,
    height: 30,
    width: 30
  },
  circleSected: {
    backgroundColor: Colors.ACCENT_MINT,
    borderWidth: 2,
    borderColor: Colors.WHITE,
    borderRadius: 15,
    height: 30,
    width: 30
  }
}
const FourDotInputDarkStyle = {
  container: {
    width: 200,
    height: 60
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
    textAlign: 'center',
    color: Colors.ACCENT_RED,
    backgroundColor: Colors.TRANSPARENT,
    padding: 20
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

export { FourDotInputDarkStyle }
export { FourDotInputStyle }
