import { LayoutObject } from '@/EasyMode'
import { makeScreen, resetFill } from './Screen'

export function render(node: LayoutObject) {
  const screen = makeScreen(node.getWidth(), node.getHeight())
  resetFill()
  node.render(screen)
  return screen
}
