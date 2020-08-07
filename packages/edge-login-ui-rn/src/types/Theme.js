// @flow

export type Theme = {|
  // The app scaling factor, which is the height of "normal" text:
  rem(size: number): number,

  pressedOpacity: number,
  fontFamily: string,

  // Background colors:
  backgroundGradientLeft: string,
  backgroundGradientRight: string,

  // Modal:
  modal: string,
  modalShadow: string,
  modalBlurType: 'light' | 'dark',

  // Text colors:
  primaryText: string,

  // Button colors:
  primaryButtonOutline: string,
  primaryButton: string,
  primaryButtonText: string,

  secondaryButtonOutline: string,
  secondaryButton: string,
  secondaryButtonText: string
|}
