// ===== File: settings.js =====
document.addEventListener('DOMContentLoaded', function () {
    // Inject the extension version into the settings page
    const manifestData = chrome.runtime.getManifest();
    const versionElement = document.getElementById('extension-version');
    versionElement.textContent = manifestData.version;
  
    // Set a flag indicating the user has visited the settings page
    chrome.storage.local.set({ setupLinkClicked: true });
  
    const defaultPageSelect = document.getElementById('default-page-select');
    const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
    const languageSelect = document.getElementById('language-select');
  
    // Load settings
    chrome.storage.local.get(['defaultPage', 'darkMode', 'language'], function (result) {
      if (result.defaultPage) {
        defaultPageSelect.value = result.defaultPage;
      }
      if (result.darkMode) {
        darkModeCheckbox.checked = result.darkMode;
        document.body.classList.toggle('dark-mode', result.darkMode);
      }
  
      const fallback = navigator.language.split('-')[0].toLowerCase();
      const langMap = {
        en: 'english', id: 'indonesian', es: 'spanish', ru: 'russian', vi: 'vietnamese',
        hi: 'hindi', th: 'thai', zh: 'mandarin', ha: 'hausa', ur: 'urdu',
        tl: 'filipino', uk: 'ukrainian', pt: 'brazilian'
      };
      let langFile = result.language;
      if (!Object.values(langMap).includes(langFile)) {
        const fallbackCode = fallback in langMap ? langMap[fallback] : 'english';
        langFile = langMap[langFile] || fallbackCode;
      }
      languageSelect.value = langFile;
      loadLanguage(langFile); // Load language file from translations.js
    });
  
    // Save default page setting
    defaultPageSelect.addEventListener('change', function () {
      const selectedPage = defaultPageSelect.value;
      chrome.storage.local.set({ defaultPage: selectedPage });
    });
  
    // Save dark mode setting
    darkModeCheckbox.addEventListener('change', function () {
      const isDarkMode = darkModeCheckbox.checked;
      chrome.storage.local.set({ darkMode: isDarkMode });
      document.body.classList.toggle('dark-mode', isDarkMode);
    });
  
    // Save language setting
    languageSelect.addEventListener('change', function () {
      const selectedLang = languageSelect.value;
      chrome.storage.local.set({ language: selectedLang }, function () {
        loadLanguage(selectedLang, function () {
          location.reload();
        });
      });
    });
  
    // Init translations
    if (typeof initializeTranslations === 'function') {
      initializeTranslations();
    }
  });