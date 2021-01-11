// @flow

import { type Reducer } from 'redux'
import { sprintf } from 'sprintf-js'

import s from '../common/locales/strings.js'
import { type Action } from '../types/ReduxTypes.js'

export type TermsState = {}

const initialState: TermsState = {
  items: [
    {
      title: sprintf(s.strings.terms_one, s.strings.app_name_default),
      value: false
    },
    { title: s.strings.terms_two, value: false },
    {
      title: sprintf(s.strings.terms_three, s.strings.app_name_default),
      value: false
    },
    {
      title: sprintf(s.strings.terms_four, s.strings.app_name_default),
      value: false
    }
  ]
}

export const terms: Reducer<TermsState, Action> = function (
  state = initialState,
  action
) {
  switch (action.type) {
    case 'ACCEPT_TERMS_CONDITIONS':
      return state
    default:
      return state
  }
}
