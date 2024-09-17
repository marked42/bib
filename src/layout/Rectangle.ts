import { Coordinate } from './Coordinate'
import { Length, LengthZero } from './Length'

export class Rectangle {
  width: Length
  height: Length

  constructor(options: { width: Length; height: Length }) {
    const { width, height } = options
    this.width = width
    this.height = height
  }

  static get default() {
    return new Rectangle({
      width: LengthZero,
      height: LengthZero,
    })
  }

  offset(width: number, height: number) {
    return new Rectangle({
      width: this.width + width,
      height: this.height + height,
    })
  }
}

export class PositionedRectangle extends Rectangle {
  pos: Coordinate

  constructor(options: {
    x: Length
    y: Length
    width: Length
    height: Length
  }) {
    super(options)
    this.pos = new Coordinate(options.x, options.y)
  }

  add(x: number, y: number) {
    return new PositionedRectangle({
      x: this.pos.x + x,
      y: this.pos.y + y,
      width: this.width,
      height: this.height,
    })
  }
}
