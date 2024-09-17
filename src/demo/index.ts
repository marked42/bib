import { Element } from '../layout/Element'
import { buildLayoutTree } from '../layout/LayoutTree'

function renderElement(context: CanvasRenderingContext2D, element: Element) {
  const renderTree = buildLayoutTree(element, 800, 600)
  renderTree.layout()

  console.log(renderTree)

  renderTree.paint(context)
}

export function demoBlockFixedWidth(context: CanvasRenderingContext2D) {
  const element = Element.fromJson({
    tag: 'div',
    attributes: {},
    styles: {
      backgroundColor: 'gray',
      borderColor: 'light-blue',
      width: '200px',
      height: '200px',
    },
    children: [],
  })

  renderElement(context, element)
}

export function demoBlockPercentWidth(context: CanvasRenderingContext2D) {
  const element = Element.fromJson({
    tag: 'div',
    attributes: {},
    styles: {
      backgroundColor: 'gray',
      borderColor: 'light-blue',
      width: '30%',
      height: '50%',
    },
    children: [],
  })

  renderElement(context, element)
}

export function demoBlockAutoWidth(context: CanvasRenderingContext2D) {
  const element = Element.fromJson({
    tag: 'div',
    attributes: {},
    styles: {
      backgroundColor: 'gray',
      borderColor: 'light-blue',
      width: 'auto',
      height: '200px',
      margin: '100px',
    },
    children: [],
  })

  renderElement(context, element)
}

export function demoBlockOverflowAutoMarginRightAdjustedToNegative(
  context: CanvasRenderingContext2D
) {
  const element = Element.fromJson({
    tag: 'div',
    attributes: {},
    styles: {
      backgroundColor: 'gray',
      borderColor: 'light-blue',
      width: 'auto',
      height: '200px',
      margin: 'auto',
      padding: '500px',
    },
    children: [],
  })

  renderElement(context, element)
}

export function demoBlockOverflowNonAutoMarginRightNotAdjusted(
  context: CanvasRenderingContext2D
) {
  const element = Element.fromJson({
    tag: 'div',
    attributes: {},
    styles: {
      backgroundColor: 'gray',
      borderColor: 'light-blue',
      width: 'auto',
      height: '200px',
      margin: '10px',
      padding: '500px',
    },
    children: [],
  })

  renderElement(context, element)
}

export function demoBlockUnderflowAutoWidth(context: CanvasRenderingContext2D) {
  const element = Element.fromJson({
    tag: 'div',
    attributes: {},
    styles: {
      backgroundColor: 'gray',
      borderColor: 'light-blue',
      width: 'auto',
      height: '200px',
      margin: '50px',
      padding: '100px',
    },
    children: [],
  })

  renderElement(context, element)
}

export function demoBlockUnderflowAutoWidthAutoMargins(
  context: CanvasRenderingContext2D
) {
  const element = Element.fromJson({
    tag: 'div',
    attributes: {},
    styles: {
      backgroundColor: 'gray',
      borderColor: 'light-blue',
      width: 'auto',
      height: '200px',
      margin: 'auto',
      padding: '100px',
    },
    children: [],
  })

  renderElement(context, element)
}

export function demoBlockUnderflowFixedWidthAutoMargins(
  context: CanvasRenderingContext2D
) {
  const element = Element.fromJson({
    tag: 'div',
    attributes: {},
    styles: {
      backgroundColor: 'gray',
      borderColor: 'light-blue',
      width: '200px',
      height: '200px',
      margin: 'auto',
      padding: '100px',
    },
    children: [],
  })

  renderElement(context, element)
}
