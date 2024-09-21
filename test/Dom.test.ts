import {
  ClassRule,
  CssRuleSet,
  DomColumn,
  IdRule,
  parseHTML,
  TagRule,
} from '../src/Dom'

describe('dom', () => {
  it('styles a tree of nodes with multiple rules', async () => {
    const html = [
      '<col id="name">',
      '<row class="kind">first\nsecond</row>',
      '<row>third\nfourth</row>',
      '</col>',
    ]
    const dom = parseHTML(html.join('')) as DomColumn
    const rules = new CssRuleSet({
      '.kind': { height: 3 },
      '#name': { height: 5 },
      row: { width: 10 },
    })
    dom.findRules(rules)
    expect(dom.rules).toEqual([new IdRule('#name', { height: 5 })])
    expect(dom.children[0].rules).toEqual([
      new ClassRule('.kind', { height: 3 }),
      new TagRule('row', { width: 10 }),
    ])
    expect(dom.children[1].rules).toEqual([new TagRule('row', { width: 10 })])
  })
})
