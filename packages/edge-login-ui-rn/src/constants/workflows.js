// @flow

import s from '../common/locales/strings.js'

export type Scene = {
  back: boolean,
  skip: boolean,
  title: string,
  subTitle: string
}

export type Workflows = {
  firstLoadWF: Scene[],
  initalizeWF: Scene[],
  createWF: Scene[],
  passwordWF: Scene[],
  passwordWFForced: Scene[],
  pinWF: Scene[],
  recoveryWF: Scene[],
  otpWF: Scene[],
  recoveryLoginWF: Scene[]
}

export type WorkflowName = $Keys<Workflows>

export const workflows: Workflows = {
  firstLoadWF: [{ back: false, skip: false, title: '', subTitle: '' }],
  initalizeWF: [{ back: false, skip: false, title: '', subTitle: '' }],
  createWF: [
    { back: false, skip: false, title: '', subTitle: '' },
    {
      back: true,
      skip: false,
      title: s.strings.choose_title_username,
      subTitle: s.strings.step_one
    },
    {
      back: true,
      skip: false,
      title: s.strings.choose_title_password,
      subTitle: s.strings.step_two
    },
    {
      back: true,
      skip: false,
      title: s.strings.set_four_digit_pin,
      subTitle: s.strings.step_three
    },
    {
      back: false,
      skip: false,
      title: s.strings.create_your_account,
      subTitle: ''
    },
    {
      back: false,
      skip: false,
      title: s.strings.write_it_down,
      subTitle: s.strings.account_confirmation
    },
    {
      back: true,
      skip: false,
      title: s.strings.quick_review,
      subTitle: s.strings.account_confirmation
    }
  ],
  passwordWF: [
    {
      back: true,
      skip: false,
      title: s.strings.change_password,
      subTitle: ''
    }
  ],
  passwordWFForced: [
    {
      back: true,
      skip: false,
      title: s.strings.change_password,
      subTitle: ''
    }
  ],
  pinWF: [
    {
      back: true,
      skip: false,
      title: s.strings.change_pin,
      subTitle: ''
    }
  ],
  recoveryWF: [
    {
      back: true,
      skip: false,
      title: s.strings.recovery,
      subTitle: ''
    }
  ],
  otpWF: [
    {
      back: true,
      skip: false,
      title: s.strings.otp_header,
      subTitle: ''
    }
  ],
  recoveryLoginWF: [
    {
      back: true,
      skip: false,
      title: s.strings.recovery_questions_header,
      subTitle: ''
    },
    {
      back: true,
      skip: false,
      title: s.strings.change_password,
      subTitle: ''
    },
    {
      back: true,
      skip: false,
      title: s.strings.change_pin,
      subTitle: ''
    }
  ]
}
