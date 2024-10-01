export const initTouchHandler = sections => {
  let currentSectionIndex = 0
  let isScrolling = false
  const scrollDuration = 750
  let startY = 0

  // Smooth scrolling function
  function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime = null

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }

  // Touch start event handler
  const onTouchStart = event => {
    startY = event.touches[0].clientY
  }

  // Touch move event handler
  const onTouchMove = event => {
    if (isScrolling) return
    isScrolling = true

    const deltaY = startY - event.touches[0].clientY
    const previousSectionIndex = currentSectionIndex // Store the previous index

    if (deltaY > 0) {
      // Scrolling down
      if (currentSectionIndex < sections.length - 1) {
        currentSectionIndex++
      }
    } else {
      // Scrolling up
      if (currentSectionIndex > 0) {
        currentSectionIndex--
      }
    }

    // Ensure the currentSectionIndex is within bounds before accessing sections[currentSectionIndex]
    if (currentSectionIndex >= 0 && currentSectionIndex < sections.length) {
      smoothScrollTo(sections[currentSectionIndex].offsetTop, scrollDuration)
    } else {
      // Revert to previous section if out of bounds
      currentSectionIndex = previousSectionIndex
    }

    setTimeout(() => {
      isScrolling = false
    }, scrollDuration)
  }

  // Add touch event listeners
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: false })
}
