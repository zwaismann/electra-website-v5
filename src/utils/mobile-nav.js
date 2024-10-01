const mobileNav = () => {
  const headerBtn = document.querySelector('.menu-button')
  const mobileNav = document.querySelector('.mobile-nav')
  const mobileLinks = document.querySelectorAll('.mobile-nav__link')

  let isMobileNavOpen = false

  if (!headerBtn || !mobileNav || !mobileLinks.length) return

  headerBtn.addEventListener('click', () => {
    isMobileNavOpen = !isMobileNavOpen
    mobileNav.style.display = isMobileNavOpen ? 'flex' : 'none'
    document.body.style.overflowY = isMobileNavOpen ? 'hidden' : 'auto'
    headerBtn.setAttribute('aria-expanded', isMobileNavOpen) // Accessibility
  })

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      isMobileNavOpen = false
      mobileNav.style.display = 'none'
      document.body.style.overflowY = 'auto'
      headerBtn.setAttribute('aria-expanded', 'false') // Accessibility
    })
  })
}

export default mobileNav
