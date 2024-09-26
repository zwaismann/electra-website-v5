const mobileNav = () => {
  const headerBtn = document.querySelector('.menu-button')
  const mobileNav = document.querySelector('.mobile-nav')
  const mobileLinks = document.querySelectorAll('.mobile-nav__link')

  // State
  let isMobileNavOpen = false

  headerBtn.addEventListener('click', () => {
    isMobileNavOpen = !isMobileNavOpen
    if (isMobileNavOpen) {
      mobileNav.style.display = 'flex'
      document.body.style.overflowY = 'hidden' // Prevent body scroll
    } else {
      mobileNav.style.display = 'none'
      document.body.style.overflowY = 'auto' // Re-enable body scroll
    }
  })

  // Close the mobile menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      isMobileNavOpen = false
      mobileNav.style.display = 'none'
      document.body.style.overflowY = 'auto' // Re-enable body scroll
    })
  })
}

export default mobileNav
