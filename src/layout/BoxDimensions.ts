import { Rectangle } from './Rectangle'
import { EdgeSize } from './EdgeSize'

export class BoxDimensions {
  margin: EdgeSize
  border: EdgeSize
  padding: EdgeSize
  content: Rectangle

  constructor(options: {
    margin: EdgeSize
    border: EdgeSize
    padding: EdgeSize
    content: Rectangle
  }) {
    const { margin, border, padding, content } = options

    this.margin = margin
    this.border = border
    this.padding = padding
    this.content = content
  }

  static get default() {
    return new BoxDimensions({
      margin: EdgeSize.default,
      border: EdgeSize.default,
      padding: EdgeSize.default,
      content: Rectangle.default,
    })
  }

  get marginBox() {
    const { top, bottom, left, right } = this.margin
    return this.borderBox.offset(left + right, top + bottom)
  }

  get borderBox() {
    const { top, bottom, left, right } = this.border
    return this.paddingBox.offset(left + right, top + bottom)
  }

  get paddingBox() {
    const { top, bottom, left, right } = this.padding
    return this.content.offset(left + right, top + bottom)
  }
}
