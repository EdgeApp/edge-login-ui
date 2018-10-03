// @flow
import { scale } from '../../../common/util/scaling.js'

const LogoHeaderStyle = {
  container: {
    position: 'relative',
    width: '100%',
    paddingTop: scale(40),
    paddingBottom: scale(24),
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    height: scale(45),
    position: 'relative'
    // width: null,
    // height: null
    // resizeMode: 'stretch'
  }
}
const LogoHeaderStyleShort = {
  container: {
    position: 'relative',
    width: '100%',
    paddingTop: scale(36),
    paddingBottom: scale(18),
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    position: 'relative',
    height: scale(40)
    // width: null,
    // height: null
    // resizeMode: 'stretch'
  }
}
const LogoHeaderScaledStyle = {
  container: {
    position: 'relative',
    width: '100%',
    paddingTop: scale(42),
    paddingBottom: scale(24),
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    position: 'relative',
    height: scale(44),
    overflow: 'visible'
    // resizeMode: 'stretch'
  }
}
const LogoHeaderScaledStyleShort = {
  container: {
    position: 'relative',
    width: '100%',
    paddingTop: scale(32),
    paddingBottom: scale(20),
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    position: 'relative',
    height: scale(38)
    // width: null,
    // height: null
    // resizeMode: 'stretch'
  }
}
export {
  LogoHeaderStyleShort,
  LogoHeaderStyle,
  LogoHeaderScaledStyleShort,
  LogoHeaderScaledStyle
}
