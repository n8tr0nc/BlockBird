// ===== File: panel-layout.js =====
(function () {
    document.addEventListener('DOMContentLoaded', () => {
      function checkSidePanel() {
        if (window.innerHeight >= 601) {
          document.body.classList.add('panel-open');
        } else {
          document.body.classList.remove('panel-open');
        }
      }
  
      checkSidePanel();
  
      if (!window.listenerAdded) {
        window.addEventListener('resize', checkSidePanel);
        window.listenerAdded = true;
      }
    });
  })();