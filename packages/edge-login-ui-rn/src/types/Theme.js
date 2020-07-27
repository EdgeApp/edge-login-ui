// @flow

export type Theme = {|
  // The app scaling factor, which is the height of "normal" text:
  rem(size: number): number,

  pressedOpacity: number,
  fontFamily: string,

  // Background colors:
  backgroundGradientLeft: string,
  backgroundGradientRight: string
|}
