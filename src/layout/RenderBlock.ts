import { Coordinate } from './Coordinate'
import { RenderFlow } from './RenderFlow'
import { cssLength } from './RenderStyle'

export class RenderBlock extends RenderFlow {
  layout() {
    this.dimensions.content.width = cssLength(this.renderStyle.width)
    this.dimensions.content.height = cssLength(this.renderStyle.height)

    let prev: RenderFlow | undefined = undefined
    for (const child of this.children) {
      child.layout()
      if (prev) {
        child.pos = new Coordinate(
          prev.pos.x,
          prev.pos.y + prev.dimensions.marginBox.height
        )
      }

      prev = child
    }
  }

  /**
   * TODO: 生成匿名盒
   *
   * 1. 为box中 inline-level生成匿名盒
   * 2. 连续的inline-level 只需要一个匿名盒，最小化包围盒数量
   * 3. inline-level中包含block的，inline-level需要被截断
   */
  generateAnonymousBox() {
    const allBlockLevel = this.children.every((child) => child.isBlockLevel())
    const allInlineLevel = this.children.every((child) => child.isInlineLevel())

    if (allBlockLevel || allInlineLevel) {
      return
    }
  }

  paint(canvas: CanvasRenderingContext2D) {
    const paintBorders = () => {
      const borderRectangles = [
        this.borderTopRect,
        this.borderBottomRect,
        this.borderLeftRect,
        this.borderRightRect,
      ]

      const { x, y } = this.globalPosition
      borderRectangles.forEach((rect) => {
        const { width, height } = rect
        canvas.fillStyle = this.renderStyle.borderColor
        canvas.fillRect(x, y, width, height)
      })
    }

    const paintContent = () => {
      const { x, y } = this.globalPosition
      const { width, height } = this.paddingRect
      canvas.fillStyle = this.renderStyle.backgroundColor
      canvas.fillRect(x, y, width, height)
    }

    const paintSelf = () => {
      paintBorders()
      paintContent()
    }

    paintSelf()
    for (const child of this.children) {
      child.paint(canvas)
    }
  }
}
