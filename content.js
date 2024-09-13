// Function to remove suggestions and comments while in playlist mode
function removeSuggestionsAndComments() {
    const upNext = document.querySelector('#related'); // YouTube related video suggestions
    const endscreen = document.querySelector('.ytp-endscreen-content'); // Endscreen suggestions on YouTube
    const comments = document.querySelector('#comments'); // YouTube comments section
    
    if (upNext) {
        upNext.style.display = 'none'; // Hide suggestions on the side
    }

    if (endscreen) {
        endscreen.style.display = 'none'; // Hide suggestions at the end of the video
    }

    if (comments) {
        comments.style.display = 'none'; // Hide the comments section
    }
}

// Detect if we are in playlist mode
function isPlaylistMode() {
    return window.location.href.includes('list=');
}

// Remove suggestions and comments periodically if in playlist mode
setInterval(() => {
    if (isPlaylistMode()) {
        removeSuggestionsAndComments();
    }
}, 1000); // Check every second if suggestions or comments appear
