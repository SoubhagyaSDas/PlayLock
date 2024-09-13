const toggleFocusMode = document.getElementById('toggleFocusMode');
const removeSuggestions = document.getElementById('removeSuggestions');
const removeComments = document.getElementById('removeComments');

// Load the current state from storage
chrome.storage.sync.get(['focusModeEnabled', 'removeSuggestions', 'removeComments'], function(data) {
    toggleFocusMode.checked = data.focusModeEnabled || false;
    removeSuggestions.checked = data.removeSuggestions || false;
    removeComments.checked = data.removeComments || false;
});

// Save the state when toggled
toggleFocusMode.addEventListener('change', function() {
    chrome.storage.sync.set({ focusModeEnabled: toggleFocusMode.checked }, function() {
        chrome.runtime.sendMessage({ type: 'showNotification', message: toggleFocusMode.checked ? 'Focus Mode Enabled' : 'Focus Mode Disabled' });
    });
});

removeSuggestions.addEventListener('change', function() {
    chrome.storage.sync.set({ removeSuggestions: removeSuggestions.checked });
});

removeComments.addEventListener('change', function() {
    chrome.storage.sync.set({ removeComments: removeComments.checked });
});
