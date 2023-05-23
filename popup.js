// Populate the dropdown with the available languages.
function populateDropdown() {
    // This would need to be replaced with the actual languages your extension supports.
    let languages = ['English', 'Spanish', 'French', 'German'];
    let dropdown = document.querySelector('#language-dropdown');
    
    for (let language of languages) {
        let option = document.createElement('option');
        option.textContent = language;
        dropdown.appendChild(option);
    }
}

// Fetch the current target language from Chrome's storage and select it in the dropdown.
function fetchTargetLanguage() {
    chrome.storage.sync.get('targetLanguage', function(data) {
        let dropdown = document.querySelector('#language-dropdown');
        if (data.targetLanguage) {
            dropdown.value = data.targetLanguage;
        }
    });
}

// Save the target language to Chrome's storage when the dropdown selection changes.
function saveTargetLanguage() {
    let dropdown = document.querySelector('#language-dropdown');
    chrome.storage.sync.set({ 'targetLanguage': dropdown.value });
}

// Initialize the popup when the document has loaded.
document.addEventListener('DOMContentLoaded', function() {
    populateDropdown();
    fetchTargetLanguage();
    
    // Add a listener to the dropdown to save the target language when it changes.
    let dropdown = document.querySelector('#language-dropdown');
    dropdown.addEventListener('change', saveTargetLanguage);
});
