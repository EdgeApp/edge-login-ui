// @flow

export * from './Colors'
export * from './Fonts'
export * from './Theme'
export * from './IconConstants'
export * from './OtpConstants'

export const WORKFLOW_FIRST_LOAD = 'firstLoadWF'
export const WORKFLOW_INIT = 'initalizeWF'
export const WORKFLOW_CREATE = 'createWF'
export const WORKFLOW_PASSWORD = 'passwordWF'
export const WORKFLOW_PASSWORD_FORCED = 'passwordWFForced'
export const WORKFLOW_PIN = 'pinWF'

export const WORKFLOW_RECOVERY_LOGIN = 'recoveryLoginWF'
export const WORKFLOW_OTP = 'otpWF'

export const OTP_REMINDER_MILLISECONDS = 604800000
export const OTP_REMINDER_STORE_NAME = 'app.edge.login'
export const OTP_REMINDER_KEY_NAME_CREATED_AT = 'createdAt'
export const OTP_REMINDER_KEY_NAME_LAST_OTP_CHECKED = 'lastOtpCheck'
export const OTP_REMINDER_KEY_NAME_DONT_ASK = 'OtpDontAsk'
