import { Screen } from '../Render/Screen'
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

  render(screen: Screen) {
    super.render(screen)

    this.children.forEach((child) => {
      child.render(screen)
    })
  }
}
