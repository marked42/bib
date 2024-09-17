import {
  CSSLengthValueType,
  Keyword,
  LengthUnit,
  parseStyleBorder,
  parseStyleMargin,
  parseStylePadding,
  parseStyleWidth,
  styleLengthToPx,
  styleLengthToRemaining,
  StyleWidth,
} from '../CSS/index'
import { Coordinate } from './Coordinate'
import { RenderFlow } from './RenderFlow'

const isAuto = (value: StyleWidth) =>
  value.type === CSSLengthValueType.Keyword && value.name === Keyword.Auto

export class RenderBlock extends RenderFlow {
  layout() {
    this.calculateWidth()

    let prev: RenderFlow | undefined = undefined
    for (const child of this.children) {
      child.layout()
      if (prev) {
        child.pos = new Coordinate(
          prev.pos.x,
          prev.pos.y + prev.dimensions.marginBox.height
        )
      }

      prev = child
    }

    this.calculateHeight()
  }

  calculateWidth() {
    const size = {
      width: parseStyleWidth(this.renderStyle.styles.width || Keyword.Auto),
    }

    const paddings = {
      left: parseStylePadding(this.renderStyle.styles.padding || '0px'),
      right: parseStylePadding(this.renderStyle.styles.padding || '0px'),
      top: parseStylePadding(this.renderStyle.styles.padding || '0px'),
      bottom: parseStylePadding(this.renderStyle.styles.padding || '0px'),
    }

    const margins = {
      left: parseStyleMargin(this.renderStyle.styles.margin || '0px'),
      right: parseStyleMargin(this.renderStyle.styles.margin || '0px'),
      top: parseStyleMargin(this.renderStyle.styles.margin || '0px'),
      bottom: parseStyleMargin(this.renderStyle.styles.margin || '0px'),
    }

    const borders = {
      left: parseStyleBorder(this.renderStyle.styles.border || '0px'),
      right: parseStyleBorder(this.renderStyle.styles.border || '0px'),
      top: parseStyleBorder(this.renderStyle.styles.border || '0px'),
      bottom: parseStyleBorder(this.renderStyle.styles.border || '0px'),
    }

    const horizontalLengths = [
      size.width,
      paddings.left,
      paddings.right,
      borders.left,
      borders.right,
      margins.left,
      margins.right,
    ]
    const parentWidth = this.parent.containingRect().width
    const total = horizontalLengths.reduce(
      (acc, len) => acc + styleLengthToPx(len, parentWidth),
      0
    )

    if (total >= parentWidth) {
      // TODO: overflow, negative margin ?
      const overflow = total - parentWidth

      if (isAuto(size.width)) {
        size.width = {
          type: CSSLengthValueType.Length,
          value: 0,
          unit: LengthUnit.Px,
        }
      }
      if (isAuto(margins.left)) {
        margins.left = {
          type: CSSLengthValueType.Length,
          value: 0,
          unit: LengthUnit.Px,
        }
      }
      // negative margin
      if (isAuto(margins.right)) {
        margins.left = {
          type: CSSLengthValueType.Length,
          value: -overflow,
          unit: LengthUnit.Px,
        }
      }
    } else {
      const underflow = parentWidth - total
      const contentWidth = styleLengthToRemaining(
        size.width,
        parentWidth,
        underflow
      )
      size.width = {
        type: CSSLengthValueType.Length,
        value: contentWidth,
        unit: LengthUnit.Px,
      }

      // this.dimensions.content.width = contentWidth
      const remaining = underflow - contentWidth

      if (isAuto(margins.left) && isAuto(margins.right)) {
        margins.left = {
          type: CSSLengthValueType.Length,
          value: remaining * 0.5,
          unit: LengthUnit.Px,
        }
        margins.right = {
          type: CSSLengthValueType.Length,
          value: remaining * 0.5,
          unit: LengthUnit.Px,
        }
      } else if (isAuto(margins.left)) {
        margins.left = {
          type: CSSLengthValueType.Length,
          value: remaining,
          unit: LengthUnit.Px,
        }
      } else if (isAuto(margins.right)) {
        margins.right = {
          type: CSSLengthValueType.Length,
          value: remaining,
          unit: LengthUnit.Px,
        }
      }
    }

    this.dimensions.content.width = styleLengthToPx(size.width, parentWidth)
    this.dimensions.padding.left = styleLengthToPx(paddings.left, parentWidth)
    this.dimensions.padding.right = styleLengthToPx(paddings.right, parentWidth)
    this.dimensions.border.left = styleLengthToPx(borders.left, parentWidth)
    this.dimensions.border.right = styleLengthToPx(borders.right, parentWidth)
    this.dimensions.margin.left = styleLengthToPx(margins.left, parentWidth)
    this.dimensions.margin.right = styleLengthToPx(margins.right, parentWidth)
  }

  calculateHeight() {
    const parentHeight = this.parent.containingRect().height
    const height = parseStyleWidth(
      this.renderStyle.styles.height || Keyword.Auto
    )
    this.dimensions.content.height = styleLengthToPx(height, parentHeight)
  }

  /**
   * TODO: 生成匿名盒
   *
   * 1. 为box中 inline-level生成匿名盒
   * 2. 连续的inline-level 只需要一个匿名盒，最小化包围盒数量
   * 3. inline-level中包含block的，inline-level需要被截断
   */
  generateAnonymousBox() {
    const allBlockLevel = this.children.every((child) => child.isBlockLevel())
    const allInlineLevel = this.children.every((child) => child.isInlineLevel())

    if (allBlockLevel || allInlineLevel) {
      return
    }
  }

  paint(canvas: CanvasRenderingContext2D) {
    const paintBorders = () => {
      const borderRectangles = [
        this.borderTopRect,
        this.borderBottomRect,
        this.borderLeftRect,
        this.borderRightRect,
      ]

      const { x, y } = this.globalPosition
      borderRectangles.forEach((rect) => {
        const { width, height } = rect
        canvas.fillStyle = this.renderStyle.borderColor
        canvas.fillRect(x, y, width, height)
      })
    }

    const paintContent = () => {
      const { x, y } = this.globalPosition
      const { pos, width, height } = this.paddingRect.add(x, y)
      canvas.fillStyle = this.renderStyle.backgroundColor
      canvas.fillRect(pos.x, pos.y, width, height)

      console.log('dimensions: ', this.dimensions)
    }

    const paintSelf = () => {
      paintBorders()
      paintContent()
    }

    paintSelf()
    for (const child of this.children) {
      child.paint(canvas)
    }
  }
}
