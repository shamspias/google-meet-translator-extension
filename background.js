chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'translate') {
        // Call the translation API (replace `translateText` with your translation function)
        translateText(request.text, request.targetLanguage)
            .then(translation => {
                sendResponse({ translation: translation });
            })
            .catch(err => {
                console.error('Error translating text:', err);
                sendResponse({ error: 'Error translating text' });
            });
        
        // Indicate that the response is asynchronous
        return true;
    }
});

function translateText(text, targetLanguage) {
    return new Promise((resolve, reject) => {
        // Replace the following code with your API call
        fetch('https://translation-api-url', {
            method: 'POST',
            body: JSON.stringify({ text: text, targetLanguage: targetLanguage }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Assuming the translated text is in data.translation
            resolve(data.translation);
        })
        .catch(err => {
            reject(err);
        });
    });
}
