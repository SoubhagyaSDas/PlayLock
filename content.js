// Function to remove suggestions while in playlist mode
function removeSuggestions() {
    const upNext = document.querySelector('#related'); // YouTube related video suggestions
    const endscreen = document.querySelector('.ytp-endscreen-content'); // Endscreen suggestions on YouTube
    
    if (upNext) {
        upNext.style.display = 'none'; // Hide suggestions on the side
    }

    if (endscreen) {
        endscreen.style.display = 'none'; // Hide suggestions at the end of the video
    }
}

// Detect if we are in playlist mode
function isPlaylistMode() {
    return window.location.href.includes('list=');
}

// Remove suggestions periodically if in playlist mode
setInterval(() => {
    if (isPlaylistMode()) {
        removeSuggestions();
    }
}, 1000); // Check every second if suggestions appear
