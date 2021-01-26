// @flow

import s from '../common/locales/strings.js'

export type Scene = {
  title: string,
  subTitle: string
}

export type Workflows = {
  changePasswordWF: Scene[],
  changePinWF: Scene[],
  changeRecoveryWF: Scene[],
  createWF: Scene[],
  landingWF: Scene[],
  loadingWF: Scene[],
  otpWF: Scene[],
  otpRepairWF: Scene[],
  passwordWF: Scene[],
  pinWF: Scene[],
  recoveryLoginWF: Scene[],
  resecureWF: Scene[],
  securityAlertWF: Scene[]
}

export type WorkflowName = $Keys<Workflows>

export const workflows: Workflows = {
  // ----------------------------------------------------------------
  // Settings screens
  // ----------------------------------------------------------------
  changePasswordWF: [
    {
      // PublicChangePasswordScreen
      title: s.strings.change_password,
      subTitle: ''
    }
  ],
  changePinWF: [
    {
      // PublicChangePinScreen
      title: s.strings.change_pin,
      subTitle: ''
    }
  ],
  changeRecoveryWF: [
    {
      // PublicChangeRecoveryScreen
      title: s.strings.recovery,
      subTitle: ''
    }
    // This next scene uses `FullScreenModal` instead of workflow:
    // {
    //   // ChangeRecoveryConfirmScreen
    //   title: s.strings.confirm_recovery_questions,
    //   subTitle: ''
    // }
  ],

  // ----------------------------------------------------------------
  // Creation screens
  // ----------------------------------------------------------------
  createWF: [
    {
      // NewAccountWelcomeScreen (no header)
      title: '',
      subTitle: ''
    },
    {
      // NewAccountUsernameScreen
      title: s.strings.choose_title_username,
      subTitle: s.strings.step_one
    },
    {
      // NewAccountPasswordScreen
      title: s.strings.choose_title_password,
      subTitle: s.strings.step_two
    },
    {
      // NewAccountPinScreen
      title: s.strings.set_four_digit_pin,
      subTitle: s.strings.step_three
    },
    {
      // NewAccountWaitScreen (no back button)
      title: s.strings.create_your_account,
      subTitle: ''
    },
    {
      // NewAccountReviewScreen (no back button)
      title: s.strings.write_it_down,
      subTitle: s.strings.account_confirmation
    },
    {
      // TermsAndConditionsScreen
      title: s.strings.quick_review,
      subTitle: s.strings.account_confirmation
    }
  ],

  // ----------------------------------------------------------------
  // Miscellaneous
  // ----------------------------------------------------------------
  landingWF: [
    {
      // LandingScreen (no header)
      title: '',
      subTitle: ''
    }
  ],
  loadingWF: [
    {
      // LoadingScreen (no header)
      title: '',
      subTitle: ''
    }
  ],
  otpWF: [
    {
      // OtpErrorScreen
      title: s.strings.otp_header,
      subTitle: ''
    }
  ],
  otpRepairWF: [
    {
      // OtpRepairScreen
      title: s.strings.otp_header,
      subTitle: ''
    }
  ],

  // ----------------------------------------------------------------
  // Login methods
  // ----------------------------------------------------------------
  passwordWF: [
    {
      // PasswordLoginScreen
      title: s.strings.change_password,
      subTitle: ''
    }
  ],
  pinWF: [
    {
      // PinLoginScreen
      title: s.strings.change_pin,
      subTitle: ''
    }
  ],
  recoveryLoginWF: [
    {
      // RecoveryLoginScreen
      title: s.strings.recovery_questions_header,
      subTitle: ''
    }
  ],

  // ----------------------------------------------------------------
  // Security checkup
  // ----------------------------------------------------------------
  resecureWF: [
    {
      // ResecurePasswordScreen
      title: s.strings.change_password,
      subTitle: ''
    },
    {
      // ResecurePinScreen
      title: s.strings.change_pin,
      subTitle: ''
    }
  ],
  securityAlertWF: [
    {
      // SecurityAlertsScreen
      title: s.strings.alert_screen_title,
      subTitle: ''
    }
  ]
}
