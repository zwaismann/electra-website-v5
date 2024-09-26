const scrollIndicators = () => {
  const sections = document.querySelectorAll('.section')
  const indicators = document.querySelectorAll('.indicator')
  let currentSectionIndex = 0
  let isScrolling = false
  const scrollDuration = 750

  // Function to update the active indicator
  function updateActiveIndicator(activeIndicator) {
    indicators.forEach(indicator => {
      indicator.classList.remove('active')
    })
    activeIndicator.classList.add('active')
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
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }

  // Smooth scrolling for mouse wheel scroll
  window.addEventListener('wheel', event => {
    if (isScrolling) return
    isScrolling = true
    if (event.deltaY > 0) {
      if (currentSectionIndex < sections.length - 1) {
        currentSectionIndex++
      }
    } else {
      if (currentSectionIndex > 0) {
        currentSectionIndex--
      }
    }
    smoothScrollTo(sections[currentSectionIndex].offsetTop, scrollDuration)
    updateActiveIndicator(
      document.querySelector(
        `.indicator[data-target="#${sections[currentSectionIndex].id}"]`
      )
    )
    setTimeout(() => {
      isScrolling = false
    }, scrollDuration)
  })

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
        }
      })
    },
    {
      threshold: 0.1,
    }
  )

  sections.forEach(section => observer.observe(section))
}

export default scrollIndicators
