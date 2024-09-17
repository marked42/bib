import { parseStyleWidth } from '../CSS/index'
import { Display } from './Display'

export interface StyleMap extends Record<string, string | undefined> {
  display: Display
  height?: string
  width?: string
  backgroundColor?: string
  borderColor?: string
  borderTopColor?: string
  borderBottomColor?: string
  borderLeftColor?: string
  borderRightColor?: string
}

export class RenderStyle {
  public styles: StyleMap

  constructor(styles: StyleMap) {
    this.styles = styles
  }

  static get empty() {
    return new RenderStyle({ display: Display.Block })
  }

  // get width() {
  //   return parseStyleWidth(this.styles.width || 'auto')
  // }

  // get height() {
  //   return parseStyleWidth(this.styles.height || 'auto')
  // }

  get borderColor() {
    return this.styles.borderColor || 'white'
  }

  get backgroundColor() {
    return this.styles.backgroundColor || 'white'
  }
}

export function cssLength(value: string) {
  if (!value) {
    return 0
  }

  const pattern = /^(?<num>\d+)px$/
  const res = pattern.exec(value)

  if (!res || !res.groups?.num) {
    throw new Error(`invalid css length ${value}`)
  }
  const length = Number.parseFloat(res.groups?.num)
  if (Number.isNaN(length)) {
    throw new Error(`invalid css length ${value}`)
  }

  return length
}
