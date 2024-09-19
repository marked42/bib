import { Block } from '../src/EasyMode'

describe('lays out in easy mode', () => {
  it('lays out a single unit block', () => {
    const fixture = new Block(1, 1)
    expect(fixture.getWidth()).toEqual(1)
    expect(fixture.getHeight()).toEqual(1)
  })
})
