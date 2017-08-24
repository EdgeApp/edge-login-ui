import * as Constants from '../../common/constants'

const titleOne =
  'I understand that my funds are held securely on this device, not by Edge'
const titleTwo =
  'I understand that if I lose this device or uninstall the app, my digital assets can only be recovered with my username and password'
const titleThree =
  'I understand that if I lose my username and password, Edge will not be able to recover my account, unless I setup password recovery'
const initialState = {
  items: [
    { title: titleOne, value: false },
    { title: titleTwo, value: false },
    { title: titleThree, value: false }
  ]
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.ACCEPT_TERMS_CONDITIONS:
      return state
    default:
      return state
  }
}
