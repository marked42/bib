import { LayoutObject } from '../EasyMode'
import { PlacedRow, PlacedColumn } from '../Placed'

export class WrappedRow extends PlacedRow {
  private width: number

  constructor(width: number, ...children: LayoutObject[]) {
    super(...children)

    if (width < 0) {
      throw new Error('need non-negative width, get ' + width)
    }
    this.width = width
  }

  wrap() {
    const children = this.children.map((child) => child.wrap())

    const rows: LayoutObject[][] = []
    let currentRow: LayoutObject[] = []
    let currentX = 0

    children.forEach((child) => {
      const childWidth = child.getWidth()

      if (currentX + childWidth <= this.width) {
        currentRow.push(child)
        currentX += childWidth
      } else {
        rows.push(currentRow)
        currentRow = [child]
        currentX = childWidth
      }
    })
    rows.push(currentRow)

    const newRows = rows.map((row) => new PlacedRow(...row))
    const newColumn = new PlacedColumn(...newRows)

    return new PlacedRow(newColumn)
  }
}
