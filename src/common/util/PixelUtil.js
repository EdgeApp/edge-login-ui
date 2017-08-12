import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 320
const guidelineBaseHeight = 480

const hs = size => width / guidelineBaseWidth * size // horizontal scale
const vs = size => height / guidelineBaseHeight * size // verical scale
const ms = (size, factor = 0.5) =>
  size + (hs(size) - size) * factor // moderate scale.... this allows you to adjust the refactor size

export { hs, vs, ms }

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
