// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
  // Get the modal element
  const modal = document.getElementById('video-modal')
  console.log('Modal:', modal) // Debugging

  // Get the <mux-player> element inside the modal
  const modalVideo = document.getElementById('modal-video')
  console.log('Modal Video:', modalVideo) // Debugging

  // Get the close button inside the modal
  const closeButton = modal.querySelector('.close')
  console.log('Close Button:', closeButton) // Debugging

  // Function to open modal and play video
  function openModal(event) {
    // Get the playback ID from the clicked thumbnail
    const playbackId = event.currentTarget.getAttribute('data-playback-id')
    console.log('Playback ID:', playbackId) // Debugging

    // Set the playback ID to the mux-player
    modalVideo.setAttribute('playback-id', playbackId)

    // Display the modal with fade-in effect
    modal.classList.add('show')
  }

  // Function to close modal
  function closeModal() {
    // Hide the modal with fade-out effect
    modal.classList.remove('show')

    // Stop the video playback
    modalVideo.pause()
    modalVideo.currentTime = 0

    // Remove the playback-id attribute to reset the player
    modalVideo.removeAttribute('playback-id')
  }

  // Add event listener to the close button
  closeButton.addEventListener('click', closeModal)

  // Add event listeners to all featured thumbnails
  const thumbnails = document.querySelectorAll(
    '.video-thumbnail[id^="featured-thumbnail-"]'
  )
  console.log('Thumbnails:', thumbnails) // Debugging

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', openModal)
  })

  // Optional: Close the modal when clicking outside the modal content
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      closeModal()
    }
  })
})
