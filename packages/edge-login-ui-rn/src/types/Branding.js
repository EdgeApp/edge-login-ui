// @flow

export type ParentButton = {|
  callback: () => void,
  style?: Object,
  text: string
|}

/**
 * Branding options for the Edge login UI.
 */
export type Branding = {|
  appId?: string,
  appName?: string,
  backgroundImage?: any,
  landingScreenText?: string,
  parentButton?: ParentButton,
  primaryLogo?: any,
  primaryLogoCallback?: () => void
|}
