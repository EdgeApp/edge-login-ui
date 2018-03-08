// @flow

import * as Colors from '../constants/Colors'

const ScreenStyle = {
  flex: 1,
  width: '100%',
  height: '100%',
  backgroundColor: Colors.WHITE
}

const ScreenRow = {
  position: 'relative',
  width: '100%',
  flex: 1
}
const Shim = {
  position: 'relative',
  width: '100%',
  height: 50
}

const BackgroundScreenImageStyle = {
  flex: 1,
  width: null,
  height: null
}

const PageContainerWithHeaderStyle = {
  position: 'relative',
  flex: 1,
  width: '100%'
}

const InnerView = {
  position: 'relative',
  height: '100%',
  width: '100%'
}

export { Shim }
export { InnerView }
export { PageContainerWithHeaderStyle }
export { BackgroundScreenImageStyle }
export { ScreenStyle }
export { ScreenRow }
