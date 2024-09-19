import { LayoutObject } from './LayoutObject'

export class Block extends LayoutObject {
  constructor(
    public width: number,
    public height: number
  ) {
    super()
  }

  getWidth() {
    return this.width
  }

  getHeight() {
    return this.height
  }
}
