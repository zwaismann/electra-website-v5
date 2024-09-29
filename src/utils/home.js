const backgroundVideoEffects = () => {
  const directorLinks = document.querySelectorAll('.home__director-name')
  const canHover = window.matchMedia('(hover: hover)').matches

  if (canHover) {
    // For each director, create a mux-player and start playing the video
    directorLinks.forEach(link => {
      const playbackId = link.getAttribute('data-playback-id')
      const directorId = link.id // e.g., 'rollover-ld'
      console.log('Director ID:', directorId)

      // Extract the director key (e.g., 'ld' from 'rollover-ld')
      const directorKey = directorId.split('-')[1]
      console.log('Director Key:', directorKey)

      // Get the corresponding video container
      const videoContainerId = `video-${directorKey}`
      console.log('Video Container ID:', videoContainerId)
      const videoContainer = document.getElementById(videoContainerId)

      if (!videoContainer) {
        console.error(
          `Video container with ID '${videoContainerId}' not found.`
        )
        return // Exit the function if the video container is not found
      }

      // Create a mux-player
      const muxPlayer = document.createElement('mux-player')
      muxPlayer.setAttribute('playback-id', playbackId)
      muxPlayer.setAttribute('muted', '')
      muxPlayer.setAttribute('autoplay', '')
      muxPlayer.setAttribute('loop', '')
      muxPlayer.setAttribute('playsinline', '')
      muxPlayer.setAttribute('preload', 'auto')
      muxPlayer.setAttribute('stream-type', 'on-demand')
      muxPlayer.style.setProperty('--controls', 'none')
      muxPlayer.style.setProperty('--fit', 'cover')

      // Append the mux-player to the video container
      videoContainer.appendChild(muxPlayer)

      // Start playing the video
      muxPlayer.play().catch(error => {
        console.error(`Error playing video for ${directorId}:`, error)
      })

      // Initially set opacity to 0
      videoContainer.style.opacity = '0'

      // Add event listeners to the director link
      link.addEventListener('mouseenter', () => {
        // Reset the video's playback to the beginning
        muxPlayer.currentTime = 0

        // Play the video
        muxPlayer.play().catch(error => {
          console.error(`Error playing video for ${directorId}:`, error)
        })

        // Fade in the video
        videoContainer.style.opacity = '1'
      })

      link.addEventListener('mouseleave', () => {
        // Fade out the video
        videoContainer.style.opacity = '0'

        // Pause the video
        muxPlayer.pause()

        // Reset the video's playback to the beginning
        muxPlayer.currentTime = 0
      })
    })
  }

  // Mobile device handling remains the same
  directorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // On touch devices, navigate to the href link
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return // Allow default action
      } else {
        e.preventDefault() // Prevent navigation on desktop
      }
    })
  })
}

export default backgroundVideoEffects
