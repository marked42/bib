import { LayoutObject } from '../EasyMode'

// TODO: styles typing
export type CSSStyle = any

export abstract class CssRule {
  constructor(
    public order: RuleOrder,
    public selector: string,
    public styles: CSSStyle
  ) {}

  abstract match(node: LayoutObject): boolean
}

export enum RuleOrder {
  Id,
  Class,
  Tag,
}

export class IdRule extends CssRule {
  constructor(selector: string, styles: CSSStyle) {
    if (!selector.startsWith('#') || selector.length <= 1) {
      throw new Error(
        `ID rule ${selector} must start with # and have a selector`
      )
    }

    super(RuleOrder.Id, selector.slice(1), styles)
  }

  match(node: LayoutObject) {
    return node.attributes.id === this.selector
  }
}

export class ClassRule extends CssRule {
  constructor(selector: string, styles: CSSStyle) {
    if (!selector.startsWith('.') || selector.length <= 1) {
      throw new Error(
        `Class rule ${selector} must start with . and have a selector`
      )
    }
    super(RuleOrder.Class, selector.slice(1), styles)
  }

  match(node: LayoutObject) {
    return node.attributes.class === this.selector
  }
}

export class TagRule extends CssRule {
  constructor(selector: string, styles: CSSStyle) {
    super(RuleOrder.Tag, selector, styles)
  }

  match(node: LayoutObject) {
    return this.selector === node.tag
  }
}
