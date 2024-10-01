export const scrollToSection = sectionIndex => {
  const container = document.querySelector('.container')
  const sectionHeight = window.innerHeight

  if (!container || sectionIndex < 0) return

  container.style.transform = `translateY(-${sectionHeight * sectionIndex}px)`
}
