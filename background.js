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
        fetch('https://translation.googleapis.com/language/translate/v2', {
            method: 'POST',
            body: JSON.stringify({
                q: text,
                target: targetLanguage,
                key: 'YOUR_API_KEY'  // Replace 'YOUR_API_KEY' with your actual API Key
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Extract the translated text from the response
            resolve(data.data.translations[0].translatedText);
        })
        .catch(err => {
            reject(err);
        });
    });
}

