import * as Colors from '../../../common/constants/Colors'
import { hs, vs, fontSize } from '../../util'
import { BasicCheckBoxWithLabelAlignRight } from './CheckboxStyles'
const FormFieldStyle = {
  container: {
    position: 'relative',
    width: hs(230),
    height: vs(60)
  },
  helperCheckbox: BasicCheckBoxWithLabelAlignRight,
  labelContainer: {
    flex: 2,
    justifyContent: 'flex-end'
  },
  errorContainer: {
    flex: 2,
    flexDirection: 'row'
  },
  errorContainerLeft: {
    flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },
  errorContainerRight: {
    flex: 4
  },
  imputContainer: {
    position: 'relative',
    borderBottomColor: Colors.PRIMARY,
    borderBottomWidth: 1,
    flex: 3,
    width: '100%',
    alignItems: 'center'
  },
  labelText: {
    color: Colors.PRIMARY,
    fontSize: fontSize(11)
  },
  errorText: {
    color: Colors.ACCENT_RED,
    fontSize: fontSize(10)
  },
  inputStyle: {
    fontSize: fontSize(17),
    height: '100%',
    width: '100%',
    color: Colors.GRAY_1
  }
}

const FormFieldWithDropStyle = {
  selected: {
    container: {
      position: 'relative',
      width: hs(230),
      height: vs(200),
      justifyContent: 'flex-start'
    },
    labelContainer: {
      flex: 1,
      justifyContent: 'flex-end'
    },
    imputContainer: {
      position: 'relative',
      borderBottomColor: Colors.PRIMARY,
      borderBottomWidth: 1,
      flex: 1,
      width: '100%',
      alignItems: 'center'
    },
    searchContainer: {
      flex: 3,
      width: '100%'
    },
    labelText: {
      color: Colors.PRIMARY,
      fontSize: fontSize(11)
    },
    inputStyle: {
      fontSize: fontSize(17),
      height: '100%',
      width: '100%',
      color: Colors.GRAY_1
    },
    listView: {
      position: 'relative',
      height: '100%',
      width: '100%',
      backgroundColor: Colors.ACCENT_ORANGE
    }
  },
  container: {
    position: 'relative',
    width: hs(230),
    height: vs(60)
  },

  helperCheckbox: BasicCheckBoxWithLabelAlignRight,
  labelContainer: {
    flex: 2,
    justifyContent: 'flex-end'
  },
  errorContainer: {
    flex: 2,
    flexDirection: 'row'
  },
  errorContainerLeft: {
    flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },
  errorContainerRight: {
    flex: 4
  },
  imputContainer: {
    position: 'relative',
    borderBottomColor: Colors.PRIMARY,
    borderBottomWidth: 1,
    flex: 3,
    width: '100%',
    alignItems: 'center'
  },
  labelText: {
    color: Colors.PRIMARY,
    fontSize: fontSize(11)
  },
  errorText: {
    color: Colors.ACCENT_RED,
    fontSize: fontSize(10)
  },
  inputStyle: {
    fontSize: fontSize(17),
    height: '100%',
    width: '100%',
    color: Colors.GRAY_1
  }
}

export { FormFieldStyle }
export { FormFieldWithDropStyle }
