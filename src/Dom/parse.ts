import { Attribute, LayoutObject } from '@/EasyMode'
import { DomBlock } from './DomBlock'
import { DomColumn } from './DomColumn'
import { DomRow } from './DomRow'

const TEXT_AND_TAG = /^([^<]*)(<[^]+?>)(.*)$/ms
const TAG_AND_ATTR = /<(\w+)([^>]*)>/
const KEY_AND_VALUE = /\s*(\w+)="([^"]*)"\s*/g

export const parseHTML = (text: string) => {
  const chunks = chunkify(text.trim())
  if (!isElement(chunks[0])) {
    throw new Error('Must have enclosing outer mode')
  }

  const [node, remainder] = makeNode(chunks)

  if (!(remainder.length === 0)) {
    throw new Error('Cannot have dangling content')
  }

  return node
}

const chunkify = (text: string) => {
  const raw = []
  while (text) {
    const matches = text.match(TEXT_AND_TAG)
    if (!matches) {
      break
    }
    raw.push(matches[1])
    raw.push(matches[2])
    text = matches[3]
  }
  if (text) {
    raw.push(text)
  }
  const nonEmpty = raw.filter((chunk) => chunk.length > 0)
  return nonEmpty
}

const isElement = (chunk: string) => {
  return chunk && chunk[0] === '<'
}

const makeNode = (chunks: string[]): [LayoutObject, string[]] => {
  if (!(chunks.length > 0)) {
    throw new Error('Cannot make nodes without chunks')
  }

  if (!isElement(chunks[0])) {
    return [new DomBlock(chunks[0]), chunks.slice(1)]
  }

  const node = makeOpening(chunks[0])
  const closing = `</${node.tag}>`

  let remainder = chunks.slice(1)
  let child = null
  while (remainder && remainder[0] !== closing) {
    ;[child, remainder] = makeNode(remainder)
    node.children.push(child)
  }

  if (!(remainder && remainder[0] === closing)) {
    throw new Error(`Node with tag ${node.tag} not closed`)
  }

  return [node, remainder.slice(1)]
}

const makeOpening = (chunk: string): DomRow | DomColumn => {
  const outer = chunk.match(TAG_AND_ATTR)!
  const tag = outer[1]
  const attributes = [...outer[2].trim().matchAll(KEY_AND_VALUE)].reduce(
    (obj, [_all, key, value]) => {
      obj[key] = value
      return obj
    },
    {} as Attribute
  )
  let Cls = null
  if (tag === 'col') {
    Cls = DomColumn
  } else if (tag === 'row') {
    Cls = DomRow
  }
  if (!(Cls !== null)) {
    throw new Error(`Unrecognized tag name ${tag}`)
  }

  return new Cls(attributes)
}
