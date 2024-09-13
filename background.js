chrome.runtime.onMessage.addListener(function(request) {
    if (request.type === 'showNotification') {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon128.png',
            title: 'PlayLock',
            message: request.message
        });
    }
});
