import { LayoutObject } from '@/EasyMode'
import { makeScreen } from './Screen'

export function render(node: LayoutObject) {
  const screen = makeScreen(node.getWidth(), node.getHeight())
  node.render(screen, '')
  return screen
}
