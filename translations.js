// ===== File: translations.js =====
(function () {
  window.applyTranslations = function () {
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (window.translations?.[key]) {
        if (el.tagName === 'INPUT' && el.placeholder) {
          el.placeholder = window.translations[key];
        } else {
          el.innerText = window.translations[key];
        }
      }
    });
  };

  window.loadLanguage = function (lang, callback) {
    const langPath = `languages/${lang}.json`;
    fetch(langPath)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to fetch: ${langPath}`);
        return response.json();
      })
      .then(data => {
        window.translations = data;
        applyTranslations();
        if (callback) callback();
      })
      .catch(err => console.error('Translation load error:', err));
  };

  window.initializeTranslations = function () {
    chrome.storage.local.get(['language'], result => {
      const browserLangCode = navigator.language.split('-')[0].toLowerCase();
      const langMap = {
        en: 'english', id: 'indonesian', es: 'spanish', ru: 'russian', vi: 'vietnamese',
        hi: 'hindi', th: 'thai', zh: 'mandarin', ha: 'hausa', ur: 'urdu',
        tl: 'filipino', uk: 'ukrainian', pt: 'brazilian'
      };

      const userLangSetting = result.language || '';
      const validLangs = Object.values(langMap);

      // Final resolved language
      let langFile = validLangs.includes(userLangSetting)
        ? userLangSetting
        : langMap[userLangSetting] || langMap[browserLangCode] || 'english';

      loadLanguage(langFile);
    });
  };
})();
