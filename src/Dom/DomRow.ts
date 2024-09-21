import { WrappedRow } from '../Wrap'
import { Attribute, LayoutObject } from '../EasyMode'
import { CssRuleSet } from './CssRuleSet'

export class DomRow extends WrappedRow {
  constructor(attributes: Attribute, ...children: LayoutObject[]) {
    super(0, ...children)
    this.attributes = attributes
    this.tag = 'row'
  }

  findRules(css: CssRuleSet) {
    this.rules = css.findRules(this)
    this.children.forEach((child) => child.findRules(css))
  }
}
