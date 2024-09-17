import { BoxDimensions } from './BoxDimensions'
import { Coordinate } from './Coordinate'
import { PositionedRectangle } from './Rectangle'
import { RenderObject } from './RenderObject'

export class RenderFlow extends RenderObject {
  pos: Coordinate
  dimensions: BoxDimensions
  parent: RenderObject
  children: RenderFlow[]

  constructor(parent: RenderObject) {
    super()
    this.dimensions = BoxDimensions.default
    this.children = []
    this.pos = Coordinate.origin
    this.parent = parent
  }

  appendChild(child: RenderFlow) {
    child.parent = this
    this.children.push(child)
  }

  get globalPosition(): Coordinate {
    const parentGlobalPos = this.parent
      ? this.parent.globalPosition
      : Coordinate.origin

    return parentGlobalPos.offset(this.pos)
  }

  get marginTopLeftPos() {
    return this.pos
  }

  get marginBottomLeftPos() {
    return this.pos.offset(new Coordinate(0, this.dimensions.marginBox.height))
  }

  get borderTopLeftPos() {
    return this.marginTopLeftPos.offset(
      new Coordinate(this.dimensions.margin.left, this.dimensions.margin.top)
    )
  }

  get borderTopRect() {
    return new PositionedRectangle({
      x: this.borderTopLeftPos.x,
      y: this.borderTopLeftPos.y,
      width: this.dimensions.borderBox.width,
      height: this.dimensions.border.top,
    })
  }

  get borderBottomRect() {
    return new PositionedRectangle({
      x: this.borderTopLeftPos.x,
      y:
        this.borderTopLeftPos.y +
        this.dimensions.paddingBox.height +
        this.dimensions.border.top,
      width: this.dimensions.borderBox.width,
      height: this.dimensions.border.bottom,
    })
  }

  get borderLeftRect() {
    return new PositionedRectangle({
      x: this.borderTopLeftPos.x,
      y: this.borderTopLeftPos.y,
      width: this.dimensions.border.left,
      height: this.dimensions.borderBox.height,
    })
  }

  get borderRightRect() {
    return new PositionedRectangle({
      x:
        this.borderTopLeftPos.x +
        this.dimensions.paddingBox.width +
        this.dimensions.border.left,
      y: this.borderTopLeftPos.y,
      width: this.dimensions.border.right,
      height: this.dimensions.borderBox.height,
    })
  }

  get paddingTopLeftPos() {
    return this.borderTopLeftPos.offset(
      new Coordinate(this.dimensions.border.left, this.dimensions.border.top)
    )
  }

  get paddingRect() {
    return new PositionedRectangle({
      x: this.paddingTopLeftPos.x,
      y: this.paddingTopLeftPos.y,
      width: this.dimensions.paddingBox.width,
      height: this.dimensions.paddingBox.height,
    })
  }

  get contentTopLeftPos() {
    return this.paddingTopLeftPos.offset(
      new Coordinate(this.dimensions.padding.left, this.dimensions.padding.top)
    )
  }

  containingRect() {
    return this.dimensions.content
  }
}
