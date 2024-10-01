export const initScrollHandler = sections => {
  let currentSectionIndex = 0
  let isScrolling = false
  const scrollDuration = 750

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

  // Throttle function to prevent excessive scrolling
  const throttle = (func, delay) => {
    let lastCall = 0
    return function (...args) {
      const now = Date.now()
      if (now - lastCall >= delay) {
        lastCall = now
        return func.apply(this, args)
      }
    }
  }

  // Wheel event handler
  const onWheel = event => {
    event.preventDefault()

    if (isScrolling) return
    isScrolling = true

    const delta = event.deltaY || -event.wheelDelta || event.detail
    const previousSectionIndex = currentSectionIndex // Store the previous index

    if (delta > 0) {
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

  // Add wheel event listener with throttling
  const throttleDelay = 250 // Adjust delay as needed
  const throttledOnWheel = throttle(onWheel, throttleDelay)
  window.addEventListener('wheel', throttledOnWheel, { passive: false })

  // Function to update the active indicator
  function updateActiveIndicator(activeIndicator) {
    const indicators = document.querySelectorAll('.indicator')
    indicators.forEach(indicator => {
      indicator.classList.remove('active')
    })
    if (activeIndicator) {
      activeIndicator.classList.add('active')
    }
  }

  // Intersection Observer to update indicators
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(sections).indexOf(entry.target)
          updateActiveIndicator(
            document.querySelector(
              `.indicator[data-target="#${sections[index].id}"]`
            )
          )
          currentSectionIndex = index // Update current section index
        }
      })
    },
    {
      threshold: 0.5, // Adjust threshold as needed
    }
  )

  sections.forEach(section => observer.observe(section))

  // Add click event listeners to indicators
  const indicators = document.querySelectorAll('.indicator')
  indicators.forEach(indicator => {
    indicator.addEventListener('click', event => {
      event.preventDefault()
      const target = indicator.getAttribute('data-target')
      const targetSection = document.querySelector(target)
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' })
        updateActiveIndicator(indicator)
        currentSectionIndex = Array.from(sections).indexOf(targetSection)
      }
    })
  })
}
