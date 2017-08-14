import * as Colors from '../../constants/Colors'
// import { hs, vs, fontSize } from '../../util'

const BasicCheckBoxWithLabel = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  containerSelected: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.ACCENT_GREEN
  }
  /* backgroundColor: Colors.BUTTON_PRIMARY_UP,
  width: hs(220),
  height: vs(50),
  alignItems: 'center',
  justifyContent: 'space-around',
  borderRadius: hs(3) */
}

export { BasicCheckBoxWithLabel }
