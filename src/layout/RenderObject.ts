import { Coordinate } from './Coordinate'
import { Display } from './Display'
import { Rectangle } from './Rectangle'
import { RenderStyle } from './RenderStyle'

export class RenderObject {
  renderStyle: RenderStyle = RenderStyle.empty

  isBlockLevel() {
    const blockLevelDisplays = [Display.Block, Display.ListItem, Display.Table]
    return blockLevelDisplays.includes(this.renderStyle.styles.display)
  }

  isBlockContainer() {
    const displays = [Display.Block, Display.ListItem, Display.InlineBlock]
    return displays.includes(this.renderStyle.styles.display)
  }

  isBlockBox() {
    return this.isBlockLevel() && this.isBlockContainer()
  }

  isInlineLevel() {
    const displays = [Display.Inline, Display.InlineTable, Display.InlineBlock]
    return displays.includes(this.renderStyle.styles.display)
  }

  isAtomicInlineLevel() {
    const isInlineReplaced = this.isInlineBox() && this.isReplaced()
    const isInlineBlockOrInlineTable = [
      Display.InlineTable,
      Display.InlineBlock,
    ].includes(this.renderStyle.styles.display)

    return isInlineReplaced || isInlineBlockOrInlineTable
  }

  isReplaced() {
    return true
  }

  isNonReplaced() {
    return this.isReplaced()
  }

  isInlineBox() {
    const displays = [Display.Inline]
    return displays.includes(this.renderStyle.styles.display)
  }

  layout() {
    throw new Error('not implemented')
  }

  paint(canvas: CanvasRenderingContext2D) {
    throw new Error('not implemented')
  }

  containingRect(): Rectangle {
    throw new Error('not implemented')
  }

  get globalPosition() {
    return Coordinate.origin
  }

  appendChild(child: RenderObject) {
    throw new Error('not implemented')
  }
}
