// ===== File: default-page.js =====
(function () {
  if (!window.defaultPageInitialized) {
    const currentPath = window.location.pathname;
    const body = document.body;

    if (currentPath === '/popup.html') {
      const urlParams = new URLSearchParams(window.location.search);
      const fromDash = urlParams.get('fromDash');

      chrome.storage.local.get(['defaultPage'], result => {
        if (result.defaultPage && !fromDash) {
          // Don't show popup content, redirect immediately
          window.location.replace(result.defaultPage);
        } else {
          // No redirect needed, show popup
          body.classList.remove('hidden');
        }
      });
    } else {
      // If not on popup.html, show body immediately
      body.classList.remove('hidden');
    }

    window.defaultPageInitialized = true;
  }
})();