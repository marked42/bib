import { Element } from './Element'
import { RenderBlock } from './RenderBlock'
import { RenderObject } from './RenderObject'
import { RenderStyle } from './RenderStyle'
import { RenderView } from './RenderView'

export function buildLayoutTree(
  element: Element,
  width: number,
  height: number
) {
  const root = new RenderView(width, height)

  const buildTree = (element: Element, parent: RenderObject) => {
    const box = new RenderBlock(parent)
    box.renderStyle = new RenderStyle(element.styles)
    parent.appendChild(box)

    for (const child of element.children) {
      buildTree(child, box)
    }

    return box
  }

  buildTree(element, root)

  return root
}
