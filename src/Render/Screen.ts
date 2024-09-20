export type Screen = string[][]

export const makeScreen = (width: number, height: number) => {
  const screen: Screen = []
  for (let i = 0; i < height; i += 1) {
    screen.push(new Array(width).fill(' '))
  }
  return screen
}

export const nextFill = (fill?: string) => {
  return fill ? String.fromCharCode(fill.charCodeAt(0) + 1) : 'a'
}
