import { Length, LengthZero } from './Length'

export class EdgeSize {
  top: Length
  bottom: Length
  left: Length
  right: Length

  constructor(options: {
    top: Length
    bottom: Length
    left: Length
    right: Length
  }) {
    const { top, bottom, left, right } = options

    this.top = top
    this.bottom = bottom
    this.left = left
    this.right = right
  }

  static get default() {
    return new EdgeSize({
      top: LengthZero,
      bottom: LengthZero,
      left: LengthZero,
      right: LengthZero,
    })
  }
}
