import { initScrollHandler } from './scrollHandler'
import { initTouchHandler } from './touchHandler'

export const initScrolling = () => {
  const sections = document.querySelectorAll('.section')

  if (sections.length === 0) return

  // Initialize scroll and touch handling
  initScrollHandler(sections)
  initTouchHandler(sections)
}
