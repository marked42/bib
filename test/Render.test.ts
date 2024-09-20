import { render } from '../src/Render'
import {
  PlaceBlock as Block,
  PlacedRow as Row,
  PlacedColumn as Column,
} from '../src/Placed'

describe('renders block', () => {
  it('renders a grid of rows and columns', () => {
    const fixture = new Column(
      new Row(new Block(1, 2), new Block(3, 4)),
      new Row(new Block(1, 2), new Column(new Block(3, 4), new Block(2, 3)))
    )
    fixture.place(0, 0)
    expect(render(fixture)).toEqual([
      ['b', 'd', 'd', 'd'],
      ['b', 'd', 'd', 'd'],
      ['c', 'd', 'd', 'd'],
      ['c', 'd', 'd', 'd'],
      ['e', 'h', 'h', 'h'],
      ['e', 'h', 'h', 'h'],
      ['e', 'h', 'h', 'h'],
      ['e', 'h', 'h', 'h'],
      ['e', 'i', 'i', 'g'],
      ['f', 'i', 'i', 'g'],
      ['f', 'i', 'i', 'g'],
    ])
  })
})
