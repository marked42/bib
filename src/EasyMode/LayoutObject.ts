import { CssRuleSet } from '../Dom/CssRuleSet'
import { CssRule } from '../Dom/CssRule'
import { nextFill, Screen } from '../Render/Screen'

export type ReportResult = string | number | ReportResult[]

export type Attribute = Record<string, string>

export abstract class LayoutObject {
  x0 = 0
  y0 = 0

  tag = ''
  rules: CssRule[] = []
  attributes: Attribute = {}

  abstract getWidth(): number

  abstract getHeight(): number

  place(x0: number, y0: number) {
    this.x0 = x0
    this.y0 = y0
  }

  report(): ReportResult {
    return ['LayoutObject', this.getWidth(), this.getHeight()]
  }

  render(screen: Screen) {
    const fill = nextFill()

    for (let ix = 0; ix < this.getWidth(); ix += 1) {
      for (let iy = 0; iy < this.getHeight(); iy += 1) {
        screen[this.y0 + iy][this.x0 + ix] = fill
      }
    }
  }

  wrap(): LayoutObject {
    return this
  }

  findRules(css: CssRuleSet) {
    this.rules = css.findRules(this)
  }
}
