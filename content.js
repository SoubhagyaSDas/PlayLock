// Function to check if we are in playlist mode
function isPlaylistMode() {
    return window.location.href.includes('list=');
}

// Function to remove suggestions and comments while in playlist mode
function removeSuggestionsAndComments() {

    const upNext = document.querySelector('#related'); // YouTube related video suggestions
    const endscreen = document.querySelector('.ytp-endscreen-content'); // Endscreen suggestions on YouTube
    const comments = document.querySelector('#comments'); // YouTube comments section

    chrome.storage.sync.get(['removeSuggestions', 'removeComments'], function(data) {
        console.log("Data retrieved:", data); // Debugging line
        if (data.removeSuggestions && upNext) {
            upNext.style.display = 'none'; // Hide suggestions on the side
        }
        if (data.removeSuggestions && endscreen) {
            endscreen.style.display = 'none'; // Hide suggestions at the end of the video
        }
        if (data.removeComments && comments) { 
            comments.style.display = 'none'; // Hide the comments section
        }
    });
}

// Function to observe comments for dynamic loading
function observeComments() {
    const targetNode = document.getElementById('comments'); // Target node for mutations
    if (!targetNode) return;

    const config = { childList: true, subtree: true };

    const callback = (mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Check for comments section visibility based on user settings
                chrome.storage.sync.get('removeComments', function(data) {
                    if (data.removeComments) {
                        targetNode.style.display = 'none'; // Hide comments when they appear
                    }
                });
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

// Run the content script if Focus Mode is enabled
chrome.storage.sync.get('focusModeEnabled', function(data) {
    if (data.focusModeEnabled) {
        setTimeout(() => {
            observeComments(); // Start observing for comments after a delay
            setInterval(() => {
                if (isPlaylistMode()) {
                    removeSuggestionsAndComments();
                }
            }, 1000); // Check every second if suggestions or comments appear
        }, 3000); // Wait 3 seconds before starting the interval
    }
});
