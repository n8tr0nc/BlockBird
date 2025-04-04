// ===== File: dark-mode.js =====
(function () {
    if (!window.darkModeInitialized) {
      document.addEventListener('DOMContentLoaded', () => {
        chrome.storage.local.get(['darkMode'], result => {
          if (result.darkMode) {
            document.body.classList.add('dark-mode');
          }
        });
      });
      window.darkModeInitialized = true;
    }
  })();