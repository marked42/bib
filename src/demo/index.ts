import { Element } from '../layout/Element'
import { buildLayoutTree } from '../layout/LayoutTree'

function renderElement(context: CanvasRenderingContext2D, element: Element) {
  const renderTree = buildLayoutTree(element)
  renderTree.layout()

  console.log(renderTree)

  renderTree.paint(context)
}

export function demo1(context: CanvasRenderingContext2D) {
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

  renderElement(context, element)
}

export function demo2(context: CanvasRenderingContext2D) {
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
          backgroundColor: 'blue',
          borderColor: 'gray',
          height: '300px',
          width: '200px',
        },
        children: [],
      },
    ],
  })

  renderElement(context, element)
}
