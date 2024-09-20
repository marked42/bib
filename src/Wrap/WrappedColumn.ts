import { PlacedColumn } from '../Placed'

export class WrappedColumn extends PlacedColumn {
  wrap() {
    const children = this.children.map((child) => child.wrap())
    return new PlacedColumn(...children)
  }
}
