// @flow

import { type Theme } from '../../types/Theme.js'
import { scale } from '../../util/scaling.js'

const palette = {
  white: '#FFFFFF',
  black: '#000000',
  royalBlue: '#003B65',
  darkBlue: '#0C446A',
  edgeNavy: '#0D2145',
  edgeBlue: '#0E4B75',
  edgeMint: '#66EDA8',
  blueGray: '#A4C7DF',
  gray: '#87939E',
  lightGray: '#D9E3ED',
  mutedBlue: '#2F5E89',
  accentGreen: '#77C513',
  accentRed: '#E85466',
  accentBlue: '#0073D9',
  accentOrange: '#F1AA19',
  blackOp25: 'rgba(0, 0, 0, .25)',
  blackOp50: 'rgba(0, 0, 0, .5)',
  whiteOp10: 'rgba(255, 255, 255, .1)',
  grayOp80: 'rgba(135, 147, 158, .8)',
  accentOrangeOp30: 'rgba(241, 170, 25, .3)',
  lightGrayOp75: 'rgb(217, 227, 237, .75)',
  transparent: 'transparent'
}

export const edgeDark: Theme = {
  // The app scaling factor, which is the height of "normal" text:
  rem(size: number): number {
    return Math.round(scale(16, 0.3) * size)
  },

  fontFamily: 'System',
  pressedOpacity: 0.25,

  // background
  backgroundGradientLeft: palette.darkBlue,
  backgroundGradientRight: palette.edgeNavy,

  // modal
  modal: palette.royalBlue,
  modalShadow: palette.blackOp50,
  modalBlurType: 'light',

  // text
  primaryText: palette.white,
  secondaryText: palette.blueGray,
  dangerText: palette.accentRed,

  // buttons
  primaryButtonOutline: palette.transparent,
  primaryButton: palette.edgeMint,
  primaryButtonText: palette.edgeBlue,

  secondaryButtonOutline: palette.edgeMint,
  secondaryButton: palette.transparent,
  secondaryButtonText: palette.edgeMint,

  // Security alert modal:
  securityAlertModalBackground: palette.white,
  securityAlertModalHeaderCircle: palette.accentOrange,
  securityAlertModalHeaderIcon: palette.white,
  securityAlertModalDangerIcon: palette.accentRed,
  securityAlertModalWarningIcon: palette.accentOrange,
  securityAlertModalRowBorder: palette.lightGray,
  securityAlertModalText: palette.black
}
