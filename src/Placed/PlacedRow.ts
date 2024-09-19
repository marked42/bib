import { LayoutObject, Row } from '../EasyMode'

export class PlacedRow extends Row {
  constructor(...children: LayoutObject[]) {
    super(...children)
  }

  place(x0: number, y0: number) {
    super.place(x0, y0)

    const y1 = this.y0 + this.getHeight()
    let currentX = x0

    this.children.forEach((child) => {
      const childY = y1 - child.getHeight()
      child.place(currentX, childY)
      currentX += child.getWidth()
    })
  }

  report() {
    return [
      'row',
      this.x0,
      this.y0,
      this.x0 + this.getWidth(),
      this.y0 + this.getHeight(),
      ...this.children.map((child) => child.report()),
    ]
  }
}
