import '../styles/modern-normalize.css'
import '../styles/style.css'
import '../styles/header.css'
import '../styles/home.css'
import '../styles/featured-work.css'
import '../styles/about.css'
import '../styles/staff.css'
import '../styles/reps.css'
import '../styles/footer.css'
import '../styles/directors.css'
import '../styles/bio.css'
import '../styles/mobile-nav.css'
import '../styles/utils.css'
import '@mux/mux-player'

import mobileNav from './utils/mobile-nav'
import { initScrollHandler } from './utils/scrollHandler'
import backgroundVideoEffects from './utils/home.js'
backgroundVideoEffects()

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section')

  initScrollHandler(sections) // Initialize the scroll handler
  mobileNav() // Initialize the mobile nav
})
