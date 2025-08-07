// ===== File: include-links.js =====
(function () {
  if (!window.includeLinksInitialized) {
    document.addEventListener('DOMContentLoaded', () => {
      const navContainer = document.getElementById('nav-container');
      if (!navContainer) return;

      fetch('links.html')
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch links.html');
          return response.text();
        })
        .then(data => {
          navContainer.innerHTML = data;
          const links = navContainer.querySelectorAll('.nav-list-item');

          // Extract pathname ignoring query params
          const currentPath = window.location.pathname.split('/').pop();

          links.forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname.split('/').pop();

            // Check if the link matches current page (ignore query string)
            const isCurrent =
              linkPath === currentPath ||
              (currentPath === '' && linkPath === 'popup.html') ||
              (currentPath === 'popup.html' && link.href.includes('popup.html'));

            if (isCurrent) {
              link.classList.add('current-page');
            }

            // Add click listener to update active state
            link.addEventListener('click', () => {
              links.forEach(l => l.classList.remove('current-page'));
              link.classList.add('current-page');
            });
          });
        })
        .catch(err => console.warn('Navigation load failed:', err.message));
    });
    window.includeLinksInitialized = true;
  }
})();