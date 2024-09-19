import { Block } from '../EasyMode'

export class PlaceBlock extends Block {
  x0 = 0
  y0 = 0

  constructor(width: number, height: number) {
    super(width, height)
  }

  report() {
    return [
      'block',
      this.x0,
      this.y0,
      this.x0 + this.width,
      this.y0 + this.height,
    ]
  }
}
