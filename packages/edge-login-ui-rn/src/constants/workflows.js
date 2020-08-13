// @flow

import s from '../common/locales/strings.js'

export type Scene = {
  back: boolean,
  skip: boolean,
  title: string,
  subTitle: string
}

export type Workflows = {
  changePasswordWF: Scene[],
  changePinWF: Scene[],
  changeRecoveryWF: Scene[],
  createWF: Scene[],
  loadingWF: Scene[],
  landingWF: Scene[],
  otpWF: Scene[],
  passwordWF: Scene[],
  passwordWFForced: Scene[],
  pinWF: Scene[],
  recoveryLoginWF: Scene[]
}

export type WorkflowName = $Keys<Workflows>

export const workflows: Workflows = {
  // ----------------------------------------------------------------
  // Settings screens
  // ----------------------------------------------------------------
  changePasswordWF: [
    {
      // PublicChangePasswordScreen
      back: true,
      skip: false,
      title: s.strings.change_password,
      subTitle: ''
    }
  ],
  changePinWF: [
    {
      // PublicChangePinScreen
      back: true,
      skip: false,
      title: s.strings.change_pin,
      subTitle: ''
    }
  ],
  changeRecoveryWF: [
    {
      // PublicChangeRecoveryScreen
      back: true,
      skip: false,
      title: s.strings.recovery,
      subTitle: ''
    }
    // This next scene uses `FullScreenModal` instead of workflow:
    // {
    //   // ChangeRecoveryConfirmScreen
    //   back: true,
    //   title: s.strings.confirm_recovery_questions,
    //   subTitle: ''
    // }
  ],

  // ----------------------------------------------------------------
  // Creation screens
  // ----------------------------------------------------------------
  createWF: [
    {
      // NewAccountWelcomeScreen
      back: false,
      skip: false,
      title: '',
      subTitle: ''
    },
    {
      // NewAccountUsernameScreen
      back: true,
      skip: false,
      title: s.strings.choose_title_username,
      subTitle: s.strings.step_one
    },
    {
      // NewAccountPasswordScreen
      back: true,
      skip: false,
      title: s.strings.choose_title_password,
      subTitle: s.strings.step_two
    },
    {
      // NewAccountPinScreen
      back: true,
      skip: false,
      title: s.strings.set_four_digit_pin,
      subTitle: s.strings.step_three
    },
    {
      // NewAccountWaitScreen
      back: false,
      skip: false,
      title: s.strings.create_your_account,
      subTitle: ''
    },
    {
      // NewAccountReviewScreen
      back: false,
      skip: false,
      title: s.strings.write_it_down,
      subTitle: s.strings.account_confirmation
    },
    {
      // TermsAndConditionsScreen
      back: true,
      skip: false,
      title: s.strings.quick_review,
      subTitle: s.strings.account_confirmation
    }
  ],

  // ----------------------------------------------------------------
  // Miscellaneous
  // ----------------------------------------------------------------
  landingWF: [
    {
      // LandingScreen
      back: false,
      skip: false,
      title: '',
      subTitle: ''
    }
  ],
  loadingWF: [
    {
      // Picks a screen based on the user list
      back: false,
      skip: false,
      title: '',
      subTitle: ''
    }
  ],
  otpWF: [
    {
      // OtpErrorScreen
      back: true,
      skip: false,
      title: s.strings.otp_header,
      subTitle: ''
    }
  ],

  // ----------------------------------------------------------------
  // Login methods
  // ----------------------------------------------------------------
  passwordWF: [
    {
      // PasswordLoginScreen with logic to kick over to recoveryLoginWF
      back: true,
      skip: false,
      title: s.strings.change_password,
      subTitle: ''
    }
  ],
  passwordWFForced: [
    {
      // PasswordLoginScreen without logic to kick over to recoveryLoginWF
      back: true,
      skip: false,
      title: s.strings.change_password,
      subTitle: ''
    }
  ],
  pinWF: [
    {
      // PinLoginScreen
      back: true,
      skip: false,
      title: s.strings.change_pin,
      subTitle: ''
    }
  ],
  recoveryLoginWF: [
    {
      // RecoveryLoginScreen
      back: true,
      skip: false,
      title: s.strings.recovery_questions_header,
      subTitle: ''
    },
    {
      // RecoveryChangePasswordScreen
      back: true,
      skip: false,
      title: s.strings.change_password,
      subTitle: ''
    },
    {
      // RecoveryChangePinScreen
      back: true,
      skip: false,
      title: s.strings.change_pin,
      subTitle: ''
    }
  ]
}
