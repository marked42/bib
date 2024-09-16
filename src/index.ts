import { Element } from './layout/Element'
import { Rectangle } from './layout/Rectangle'
import { RenderBlock } from './layout/RenderBlock'
import { RenderFlow } from './layout/RenderFlow'
import { RenderStyle } from './layout/RenderStyle'

export function main() {
  const element = Element.fromJson({
    tag: 'div',
    attributes: {},
    styles: {
      backgroundColor: 'gray',
      borderColor: 'light-blue',
      width: '800px',
      height: '600px',
    },
    children: [
      {
        tag: 'div',
        attributes: {},
        styles: {
          backgroundColor: 'red',
          borderColor: 'cyan',
          height: '200px',
          width: '300px',
        },
        children: [],
      },
      {
        tag: 'div',
        attributes: {},
        styles: {
          backgroundColor: 'yellow',
          borderColor: 'gray',
          height: '300px',
          width: '200px',
        },
        children: [],
      },
    ],
  })
  console.log('element: ', element)

  const { context } = setupCanvas()
  const renderTree = buildLayoutTree(element)
  renderTree.layout()

  console.log(renderTree)

  renderTree.paint(context)
}

function setupCanvas() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  if (!canvas) {
    throw new Error('canvas not found')
  }
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('canvas rendering context not found')
  }

  return {
    canvas,
    context,
  }
}

export function buildLayoutTree(element: Element, parent?: RenderFlow) {
  const box = new RenderBlock()
  box.renderStyle = new RenderStyle(element.styles)
  parent?.appendChild(box)

  for (const child of element.children) {
    buildLayoutTree(child, box)
  }

  return box
}

main()
