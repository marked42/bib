import { Screen } from '../Render/Screen'
import { LayoutObject } from './LayoutObject'

export class Row extends LayoutObject {
  public children: LayoutObject[]

  constructor(...children: LayoutObject[]) {
    super()
    this.children = children
  }

  getWidth() {
    let result = 0
    for (const child of this.children) {
      result += child.getWidth()
    }
    return result
  }

  getHeight() {
    let result = 0
    for (const child of this.children) {
      result = Math.max(result, child.getHeight())
    }
    return result
  }

  render(screen: Screen, fill: string) {
    fill = super.render(screen, fill)

    this.children.forEach((child) => {
      fill = child.render(screen, fill)
    })

    return fill
  }
}
