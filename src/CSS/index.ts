export enum LengthUnit {
  Px = 'px',
  Em = 'em',
}

export enum CSSLengthValueType {
  Length = 'length',
  Percent = 'percent',
  Keyword = 'Keyword',
}

export enum Keyword {
  Auto = 'auto',
}

export type StyleUnitLength = {
  type: CSSLengthValueType.Length
  value: number
  unit: LengthUnit
}

export type StylePercentValue = {
  type: CSSLengthValueType.Percent
  value: number
}

export type StyleKeyword = {
  type: CSSLengthValueType.Keyword
  name: Keyword
}

export type StyleWidth = StyleUnitLength | StylePercentValue | StyleKeyword

export type StylePaddingSize = StyleUnitLength | StylePercentValue

export type StyleBorderSize = StyleUnitLength | StylePercentValue

export function parseStyleWidth(value: string): StyleWidth {
  if (value === Keyword.Auto) {
    return {
      type: CSSLengthValueType.Keyword,
      name: Keyword.Auto,
    }
  }

  const lengthPattern = /^(?<value>\d+)(?<unit>\w+)$/
  const lengthMatch = lengthPattern.exec(value)
  if (lengthMatch?.groups?.value) {
    const num = Number.parseInt(lengthMatch.groups?.value!)
    if (Number.isNaN(num)) {
      throw new Error(`unrecognized style width value ${value}`)
    }

    return {
      type: CSSLengthValueType.Length,
      value: num,
      unit: lengthMatch?.groups.unit! as LengthUnit,
    }
  }

  const percentPattern = /^(?<value>\d+)%$/
  const percentMatch = percentPattern.exec(value)
  if (percentMatch) {
    const num = Number.parseInt(percentMatch.groups?.value!)
    if (Number.isNaN(num)) {
      throw new Error(`unrecognized style width value ${value}`)
    }
    return {
      type: CSSLengthValueType.Percent,
      value: num,
    }
  }

  throw new Error(`unrecognized style width value ${value}`)
}

export const parseStyleMargin = parseStyleWidth

// TODO: remove repeated code
export function parseStylePadding(value: string): StylePaddingSize {
  const lengthPattern = /^(?<value>\d+)(?<unit>\w+)$/
  const lengthMatch = lengthPattern.exec(value)
  if (lengthMatch?.groups?.value) {
    const num = Number.parseInt(lengthMatch.groups?.value!)
    if (Number.isNaN(num)) {
      throw new Error(`unrecognized style padding value ${value}`)
    }

    return {
      type: CSSLengthValueType.Length,
      value: num,
      unit: lengthMatch?.groups.unit! as LengthUnit,
    }
  }

  const percentPattern = /^(?<value>\d+)%$/
  const percentMatch = percentPattern.exec(value)
  if (percentMatch) {
    const num = Number.parseInt(percentMatch.groups?.value!)
    if (Number.isNaN(num)) {
      throw new Error(`unrecognized style padding value ${value}`)
    }
    return {
      type: CSSLengthValueType.Percent,
      value: num,
    }
  }

  throw new Error(`unrecognized style padding value ${value}`)
}

export const parseStyleBorder = parseStylePadding

export function styleLengthToPx(style: StyleWidth, parentWidth: number) {
  switch (style.type) {
    case CSSLengthValueType.Length:
      return style.value

    case CSSLengthValueType.Percent:
      return style.value * 0.01 * parentWidth

    case CSSLengthValueType.Keyword:
      if (style.name === Keyword.Auto) {
        return 0
      }
  }

  throw new Error(`unsupported style length ${style}`)
}

export function styleLengthToRemaining(
  style: StyleWidth,
  parentWidth: number,
  remaining: number
) {
  switch (style.type) {
    case CSSLengthValueType.Length:
      return style.value

    case CSSLengthValueType.Percent:
      return style.value * 0.01 * parentWidth

    case CSSLengthValueType.Keyword:
      if (style.name === Keyword.Auto) {
        return remaining
      }
  }

  throw new Error(`unsupported style length ${style}`)
}
