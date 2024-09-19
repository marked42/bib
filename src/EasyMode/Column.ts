import { LayoutObject } from './LayoutObject'

export class Column extends LayoutObject {
  public children: LayoutObject[]

  constructor(...children: LayoutObject[]) {
    super()
    this.children = children
  }

  getHeight() {
    let result = 0
    for (const child of this.children) {
      result += child.getHeight()
    }
    return result
  }

  getWidth() {
    let result = 0
    for (const child of this.children) {
      result = Math.max(result, child.getWidth())
    }
    return result
  }
}
