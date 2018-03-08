// @flow

import { Dimensions, PixelRatio } from 'react-native'
const { width, height } = Dimensions.get('window')

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 320
const guidelineBaseHeight = 480

const hs = (size: number) => width / guidelineBaseWidth * size // horizontal scale
const vs = (size: number) => height / guidelineBaseHeight * size // verical scale
const ms = (size: number, factor: number = 0.5) =>
  size + (hs(size) - size) * factor // moderate scale.... this allows you to adjust the refactor size

const pixelRatio = PixelRatio.get()
const fontSize = (size: number) => {
  if (pixelRatio === 2) {
    return size * 1.15
  }
  if (pixelRatio === 3) {
    return size * 1.35
  }
  return size * pixelRatio
}
export { hs, vs, ms, fontSize }

/*
export function pw (num) {
  const dif = DESIGN_WIDTH - num
  const percentage = Math.floor(dif / num * 100)
  return (100 - percentage) + '%'
}

export function ph (num) {
  const dif = DESIGN_HEIGHT - num
  const percentage = Math.floor(dif / num * 100)
  return (100 - percentage) + '%'
}

*/
