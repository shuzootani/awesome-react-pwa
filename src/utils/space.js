import window from './window'

// @FIXME: mobile first, do tablet and laptop later.
// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 360
const guidelineBaseHeight = 740
const scale = size => window ? (window.innerWidth / guidelineBaseWidth) * size : 1
const verticalScale = size => window ? (window.innerHeight / guidelineBaseHeight) * size : 1
export const pickpackScale = size => (verticalScale(size) + scale(size)) / 2

export const Space = {
  XXS: Math.round(pickpackScale(3)),
  XS: Math.round(pickpackScale(6)),
  S: Math.round(pickpackScale(12)),
  SM: Math.round(pickpackScale(14)),
  M: Math.round(pickpackScale(16)),
  ML: Math.round(pickpackScale(18)),
  L: Math.round(pickpackScale(24)),
  LX: Math.round(pickpackScale(32)),
  XL: Math.round(pickpackScale(48)),
  LXX: Math.round(pickpackScale(58)),
  XXL: Math.round(pickpackScale(64)),
  XXXL: Math.round(pickpackScale(72)),
}

export default Space
