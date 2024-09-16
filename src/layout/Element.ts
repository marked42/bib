import { StyleMap } from './RenderStyle'

export class Element {
  tag: string
  attributes: Record<string, string>
  styles: StyleMap
  children: Element[]

  constructor(options: {
    tag: string
    attributes: Record<string, string>
    styles: StyleMap
    children: Element[]
  }) {
    const { tag, attributes, styles, children } = options
    this.tag = tag
    this.attributes = attributes
    this.styles = styles
    this.children = children
  }

  // TODO: element json typing
  static fromJson(data: any): Element {
    if (typeof data !== 'object' || data === null) {
      throw new Error('invalid element config')
    }

    const { tag, attributes, styles, children } = data

    return new Element({
      tag,
      attributes,
      styles,
      children: children.map(Element.fromJson),
    })
  }
}

export const V = 1
