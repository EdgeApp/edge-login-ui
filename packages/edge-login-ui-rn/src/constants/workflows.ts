import s from '../common/locales/strings'

export interface Scene {
  title: string
  subTitle: string
}

export interface Workflows {
  changePasswordWF: Scene[]
  changePinWF: Scene[]
  changeRecoveryWF: Scene[]
  createWF: Scene[]
  landingWF: Scene[]
  loadingWF: Scene[]
  otpWF: Scene[]
  otpRepairWF: Scene[]
  passwordWF: Scene[]
  pinWF: Scene[]
  recoveryLoginWF: Scene[]
  resecureWF: Scene[]
  securityAlertWF: Scene[]
}

export type WorkflowName = keyof Workflows

export const workflows: Workflows = {
  // ----------------------------------------------------------------
  // Settings scenes
  // ----------------------------------------------------------------
  changePasswordWF: [
    {
      // PublicChangePasswordScene
      title: s.strings.change_password,
      subTitle: ''
    }
  ],
  changePinWF: [
    {
      // PublicChangePinScene
      title: s.strings.change_pin,
      subTitle: ''
    }
  ],
  changeRecoveryWF: [
    {
      // PublicChangeRecoveryScene
      title: s.strings.recovery,
      subTitle: ''
    }
    // This next scene uses `FullSceneModal` instead of workflow:
    // {
    //   // ChangeRecoveryConfirmScene
    //   title: s.strings.confirm_recovery_questions,
    //   subTitle: ''
    // }
  ],

  // ----------------------------------------------------------------
  // Creation scenes
  // ----------------------------------------------------------------
  createWF: [
    {
      // NewAccountWelcomeScene
      title: '',
      subTitle: ''
    },
    {
      // NewAccountUsernameScene
      title: '',
      subTitle: ''
    },
    {
      // NewAccountPasswordScene
      title: '',
      subTitle: ''
    },
    {
      // NewAccountPinScene
      title: '',
      subTitle: ''
    },
    {
      // NewAccountWaitScene
      title: '',
      subTitle: ''
    },
    {
      // NewAccountReviewScene
      title: '',
      subTitle: ''
    },
    {
      // TermsAndConditionsScene
      title: '',
      subTitle: ''
    }
  ],

  // ----------------------------------------------------------------
  // Miscellaneous
  // ----------------------------------------------------------------
  landingWF: [
    {
      // LandingScene (no header)
      title: '',
      subTitle: ''
    }
  ],
  loadingWF: [
    {
      // LoadingScene (no header)
      title: '',
      subTitle: ''
    }
  ],
  otpWF: [
    {
      // OtpErrorScene
      title: s.strings.otp_header,
      subTitle: ''
    }
  ],
  otpRepairWF: [
    {
      // OtpRepairScene
      title: s.strings.otp_header,
      subTitle: ''
    }
  ],

  // ----------------------------------------------------------------
  // Login methods
  // ----------------------------------------------------------------
  passwordWF: [
    {
      // PasswordLoginScene
      title: s.strings.change_password,
      subTitle: ''
    }
  ],
  pinWF: [
    {
      // PinLoginScene
      title: s.strings.change_pin,
      subTitle: ''
    }
  ],
  recoveryLoginWF: [
    {
      // RecoveryLoginScene
      title: s.strings.recovery_questions_header,
      subTitle: ''
    }
  ],

  // ----------------------------------------------------------------
  // Security checkup
  // ----------------------------------------------------------------
  resecureWF: [
    {
      // ResecurePasswordScene
      title: s.strings.change_password,
      subTitle: ''
    },
    {
      // ResecurePinScene
      title: s.strings.change_pin,
      subTitle: ''
    }
  ],
  securityAlertWF: [
    {
      // SecurityAlertsScene
      title: s.strings.alert_scene_title,
      subTitle: ''
    }
  ]
}
