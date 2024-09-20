export type Screen = string[][]

export const makeScreen = (width: number, height: number) => {
  const screen: Screen = []
  for (let i = 0; i < height; i += 1) {
    screen.push(new Array(width).fill(' '))
  }
  return screen
}

const CHAR_CODE_BEFORE_A = 'a'.charCodeAt(0) - 1

let fill = CHAR_CODE_BEFORE_A

export const resetFill = () => {
  fill = CHAR_CODE_BEFORE_A
}

export const nextFill = () => {
  fill += 1
  return String.fromCharCode(fill)
}
