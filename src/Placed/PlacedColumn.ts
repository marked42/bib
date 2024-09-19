import { Column, LayoutObject } from '../EasyMode'

export class PlacedColumn extends Column {
  constructor(...children: LayoutObject[]) {
    super(...children)
  }

  place(x0: number, y0: number) {
    super.place(x0, y0)

    let currentY = this.y0
    this.children.forEach((child) => {
      child.place(x0, currentY)
      currentY += child.getHeight()
    })
  }

  report() {
    return [
      'col',
      this.x0,
      this.y0,
      this.x0 + this.getWidth(),
      this.y0 + this.getHeight(),
      ...this.children.map((child) => child.report()),
    ]
  }
}
