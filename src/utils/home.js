const backgroundVideoEffects = () => {
  const canHover = window.matchMedia('(hover: hover)').matches

  if (canHover) {
    const directorLinks = document.querySelectorAll('.home__director-name')
    const backgroundVideoContainer = document.getElementById(
      'background-video-container'
    )

    // Create a single mux-player instance
    const muxPlayer = document.createElement('mux-player')
    muxPlayer.setAttribute('muted', '')
    muxPlayer.setAttribute('autoplay', '')
    muxPlayer.setAttribute('loop', '')
    muxPlayer.setAttribute('playsinline', '')
    muxPlayer.setAttribute('preload', 'auto')
    muxPlayer.setAttribute('stream-type', 'on-demand')
    muxPlayer.style.setProperty('--controls', 'none')
    muxPlayer.style.setProperty('--fit', 'cover')
    backgroundVideoContainer.appendChild(muxPlayer)

    directorLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const playbackId = link.getAttribute('data-playback-id')
        muxPlayer.setAttribute('playback-id', playbackId)
        backgroundVideoContainer.style.opacity = '1'
      })

      link.addEventListener('mouseleave', () => {
        backgroundVideoContainer.style.opacity = '0'
      })
    })
  }

  const backgroundVideoEffects = () => {
    const canHover = window.matchMedia('(hover: hover)').matches

    if (canHover) {
      window.addEventListener('load', () => {
        // Preload videos after window load
        // ... (rest of the preloading code)
      })

      // Rest of the hover event listeners
    }
  }

  // Mobile device handling remains the same
}

export default backgroundVideoEffects
