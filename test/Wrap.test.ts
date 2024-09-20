import { WrappedRow as Row, WrappedBlock as Block } from '../src/Wrap'

describe('wrap rows', () => {
  it('wrap a row of two blocks that do not fit on one row', () => {
    const fixture = new Row(3, new Block(2, 1), new Block(2, 1))

    const wrapped = fixture.wrap()
    wrapped.place(0, 0)

    expect(wrapped.report()).toEqual([
      'row',
      0,
      0,
      2,
      2,
      [
        'col',
        0,
        0,
        2,
        2,
        ['row', 0, 0, 2, 1, ['block', 0, 0, 2, 1]],
        ['row', 0, 1, 2, 2, ['block', 0, 1, 2, 2]],
      ],
    ])
  })
})
