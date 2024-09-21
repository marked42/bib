import { LayoutObject } from '../EasyMode'
import { ClassRule, IdRule, TagRule, CssRule } from './CssRule'

export type CSSJson = Record<string, Record<string, any>>

export class CssRuleSet {
  rules: CssRule[] = []

  constructor(json: CSSJson) {
    this.rules = this.jsonToRules(json)
  }

  jsonToRules(json: CSSJson) {
    return Object.keys(json).map((selector) => {
      if (!(typeof selector == 'string' && selector.length > 0)) {
        throw new Error('Require non-empty string as selector')
      }

      if (selector.startsWith('#')) {
        return new IdRule(selector, json[selector])
      }
      if (selector.startsWith('.')) {
        return new ClassRule(selector, json[selector])
      }
      return new TagRule(selector, json[selector])
    })
  }

  findRules(node: LayoutObject) {
    const matches = this.rules.filter((rule) => rule.match(node))
    const sorted = matches.sort((left, right) => left.order - right.order)
    return sorted
  }
}
