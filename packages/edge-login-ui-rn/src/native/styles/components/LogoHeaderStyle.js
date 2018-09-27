import { vs } from '../../../common/util/PixelUtil.js'
// @flow
import { scale } from '../../../common/util/scaling.js'

const LogoHeaderStyle = {
  container: {
    position: 'relative',
    width: '100%',
    height: scale(125),
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    width: scale(150),
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
    height: scale(100),
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    position: 'relative'
    // width: null,
    // height: null
    // resizeMode: 'stretch'
  }
}
const LogoHeaderScaledStyle = {
  container: {
    position: 'relative',
    width: '100%',
    height: scale(125),
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    position: 'relative',
    width: vs(80),
    height: vs(78)
    // resizeMode: 'stretch'
  }
}
const LogoHeaderScaledStyleShort = {
  container: {
    position: 'relative',
    width: '100%',
    height: scale(100),
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    position: 'relative'
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
