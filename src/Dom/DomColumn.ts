import { Attribute, LayoutObject } from '../EasyMode'
import { WrappedColumn } from '../Wrap'
import { CssRuleSet } from './CssRuleSet'

export class DomColumn extends WrappedColumn {
  constructor(attributes: Attribute, ...children: LayoutObject[]) {
    super(...children)
    this.tag = 'col'
    this.attributes = attributes
  }

  findRules(css: CssRuleSet) {
    this.rules = css.findRules(this)
    this.children.forEach((child) => child.findRules(css))
  }
}
