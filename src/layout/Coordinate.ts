export class Coordinate {
  constructor(
    public x: number,
    public y: number
  ) {}

  static get origin() {
    return new Coordinate(0, 0)
  }

  offset(other: Coordinate) {
    return new Coordinate(this.x + other.x, this.y + other.y)
  }
}
