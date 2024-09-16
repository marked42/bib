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
