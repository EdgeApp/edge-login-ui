// @flow
import { scale } from '../../util/scaling.js'

export const LogoHeaderScaledStyle = {
  container: {
    position: 'relative',
    width: '100%',
    paddingBottom: scale(24),
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    position: 'relative',
    height: scale(44),
    overflow: 'visible',
    resizeMode: 'contain'
  }
}
