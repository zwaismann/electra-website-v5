const scrollIndicators = () => {
  const sections = document.querySelectorAll('.section')
  const indicators = document.querySelectorAll('.indicator')
  const logo = document.querySelector('.logo')
  let currentSectionIndex = 0
  let isScrolling = false
  const scrollDuration = 750

  // Function to update the active indicator
  function updateActiveIndicator(activeIndicator) {
    indicators.forEach(indicator => {
      indicator.classList.remove('active')
    })
    if (activeIndicator) {
      activeIndicator.classList.add('active')
    }
  }

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
      updateActiveIndicator(
        document.querySelector(
          `.indicator[data-target="#${sections[currentSectionIndex].id}"]`
        )
      )
    } else {
      // Revert to previous section if out of bounds
      currentSectionIndex = previousSectionIndex
    }

    setTimeout(() => {
      isScrolling = false
    }, scrollDuration)
  }

  // Add wheel event listener with throttling
  const throttleDelay = 1000 // Adjust delay as needed
  const throttledOnWheel = throttle(onWheel, throttleDelay)
  window.addEventListener('wheel', throttledOnWheel, { passive: false })

  // Smooth scrolling for indicator clicks
  indicators.forEach(indicator => {
    indicator.addEventListener('click', event => {
      event.preventDefault()
      const target = indicator.getAttribute('data-target')
      const targetSection = document.querySelector(target)
      if (targetSection) {
        smoothScrollTo(targetSection.offsetTop, scrollDuration)
        updateActiveIndicator(indicator)
        currentSectionIndex = [...sections].indexOf(targetSection)
      }
    })
  })

  // Observe sections and update indicators
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(sections).indexOf(entry.target)
          updateActiveIndicator(indicators[index])
          currentSectionIndex = index // Update current section index on scroll
        }
      })
    },
    {
      threshold: 0.1,
    }
  )

  // Fix layout shift on page load
  window.addEventListener('load', () => {
    if (sections.length > 0) {
      // Scroll to the top of the first section on page load
      smoothScrollTo(sections[0].offsetTop, 0)
      updateActiveIndicator(indicators[0])
    }
  })

  sections.forEach(section => observer.observe(section))

  // Scroll to top and reset indicators when logo is clicked
  if (logo) {
    logo.addEventListener('click', () => {
      const targetSection = sections[0]
      if (targetSection) {
        smoothScrollTo(targetSection.offsetTop, scrollDuration)
        currentSectionIndex = 0
        updateActiveIndicator(
          document.querySelector(`.indicator[data-target="#${sections[0].id}"]`)
        )
      }
    })
  }
}

export default scrollIndicators
