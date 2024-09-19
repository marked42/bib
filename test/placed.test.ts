import {
  PlaceBlock as Block,
  PlacedRow as Row,
  // PlacedColumn as Column,
} from '../src/Placed'

describe('placed blocks', () => {
  it('places a single unit block', () => {
    const fixture = new Block(1, 1)
    fixture.place(0, 0)
    expect(fixture.report()).toEqual(['block', 0, 0, 1, 1])
  })

  it('places a large block', () => {
    const fixture = new Block(3, 4)
    fixture.place(0, 0)
    expect(fixture.report()).toEqual(['block', 0, 0, 3, 4])
  })

  it('places a row of two blocks', () => {
    const fixture = new Row(new Block(1, 1), new Block(2, 4))
    fixture.place(0, 0)
    expect(fixture.report()).toEqual([
      'row',
      0,
      0,
      3,
      4,
      ['block', 0, 3, 1, 4],
      ['block', 1, 0, 3, 4],
    ])
  })
})
