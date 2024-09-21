import { WrappedBlock } from '../Wrap'

export class DomBlock extends WrappedBlock {
  constructor(public readonly lines: string) {
    super(
      Math.max(...lines.split('\n').map((line) => line.length)),
      lines.length
    )

    this.tag = 'text'
  }
}
