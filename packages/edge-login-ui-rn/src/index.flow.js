// @flow

import {
  type EdgeAccount,
  type EdgeAccountOptions,
  type EdgeContext,
  type OtpError
} from 'edge-core-js'
import * as React from 'react'

type BiometryType = 'Fingerprint' | 'TouchID' | 'FaceID'

type ParentButton = {
  callback: () => void,
  style?: any,
  text: string
}

type TouchIdInfo = {
  isTouchSupported: boolean,
  isTouchEnabled: boolean
}

type OnLogin = (account: EdgeAccount, touchIdInfo?: TouchIdInfo) => void

type Unsubscribe = () => void

/**
 * Provides modals and other services for the login UI.
 * In the future, this will be our injection point for branding &
 * theme customizations.
 */
declare export class LoginUiProvider
  extends
    React.Component<{
      children: React.Node
    }> {}

declare export class ChangePasswordScreen
  extends
    React.Component<{
      account: EdgeAccount,
      context: EdgeContext,
      showHeader?: boolean,
      onComplete: () => void
    }> {}

declare export class ChangePinScreen
  extends
    React.Component<{
      account: EdgeAccount,
      context: EdgeContext,
      showHeader?: boolean,
      onComplete: () => void
    }> {}

declare export class PasswordRecoveryScreen
  extends
    React.Component<{
      account: EdgeAccount,
      context: EdgeContext,
      showHeader?: boolean,
      onComplete: () => void
    }> {}

declare export class LoginScreen
  extends
    React.Component<{
      context: EdgeContext,

      // Branding stuff:
      appId?: string,
      appName?: string,
      backgroundImage?: any,
      fontDescription?: { regularFontFamily: string },
      landingScreenText?: string,
      parentButton?: ParentButton,
      primaryLogo?: any,
      primaryLogoCallback?: () => void,

      // Options passed to the core login methods:
      accountOptions: EdgeAccountOptions,

      // Called when the login completes:
      onLogin: OnLogin,

      // The recoveryKey from the user's email, to trigger recovery login:
      recoveryLogin?: string,

      // Do not show the security alerts screen during login,
      // since the app plans to show the `SecurityAlertsScreen` itself
      // based on `hasSecurityAlerts` and `watchSecurityAlerts`:
      skipSecurityAlerts?: boolean,

      // The username to select, if present on the device:
      username?: string,

      // Call that overwrites the internal checkAndRequestNotifications function. Executed on Login initialization:
      customPermissionsFunction?: () => void
    }> {}

declare export class OtpRepairScreen
  extends
    React.Component<{
      account: EdgeAccount,
      context: EdgeContext,
      onComplete: () => void,
      otpError: OtpError
    }> {}

declare export class SecurityAlertsScreen
  extends
    React.Component<{
      account: EdgeAccount,
      context: EdgeContext,
      onComplete: () => void
    }> {}

declare export function isTouchEnabled(username: string): Promise<boolean>
declare export function enableTouchId(account: EdgeAccount): Promise<void>
declare export function disableTouchId(account: EdgeAccount): Promise<void>
declare export function getSupportedBiometryType(): Promise<BiometryType | null>

/**
 * Returns true if the application should show the SecurityAlertsScreen.
 */
declare export function hasSecurityAlerts(account: EdgeAccount): boolean

/**
 * Calls a callback when the account gains or loses security alerts.
 */
declare export function watchSecurityAlerts(
  account: EdgeAccount,
  onChange: (hasAlerts: boolean) => void
): Unsubscribe
