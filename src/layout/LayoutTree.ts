import { Element } from './Element'
import { RenderBlock } from './RenderBlock'
import { RenderFlow } from './RenderFlow'
import { RenderStyle } from './RenderStyle'

export function buildLayoutTree(element: Element, parent?: RenderFlow) {
  const box = new RenderBlock()
  box.renderStyle = new RenderStyle(element.styles)
  parent?.appendChild(box)

  for (const child of element.children) {
    buildLayoutTree(child, box)
  }

  return box
}
