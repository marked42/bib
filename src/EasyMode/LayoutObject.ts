export type ReportResult = string | number | ReportResult[]

export abstract class LayoutObject {
  x0 = 0
  y0 = 0

  abstract getWidth(): number

  abstract getHeight(): number

  place(x0: number, y0: number) {
    this.x0 = x0
    this.y0 = y0
  }

  report(): ReportResult {
    return ['LayoutObject', this.getWidth(), this.getHeight()]
  }
}
