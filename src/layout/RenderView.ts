import { Rectangle } from './Rectangle'
import { RenderObject } from './RenderObject'

export class RenderView extends RenderObject {
  children: RenderObject[] = []

  constructor(
    public readonly width: number,
    public readonly height: number
  ) {
    super()
  }

  containingRect() {
    return new Rectangle({
      width: this.width,
      height: this.height,
    })
  }

  layout() {
    this.children.forEach((child) => {
      child.layout()
    })
  }

  appendChild(child: RenderObject) {
    this.children.push(child)
  }

  paint(context: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      child.paint(context)
    })
  }
}
