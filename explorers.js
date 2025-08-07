document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search');
  const listContainer = document.getElementById('list');
  const paginationContainer = document.getElementById('pagination-buttons');
  const prevPageButton = document.getElementById('prevPage');
  const nextPageButton = document.getElementById('nextPage');
  const firstPageButton = document.getElementById('firstPage');
  const lastPageButton = document.getElementById('lastPage');
  const loadingIndicator = document.getElementById('loading');

  const itemsPerPage = 20;
  let currentPage = 1;
  let totalPages = 1;
  let allData = [];
  let filteredData = [];

  function showLoading(isLoading) {
    loadingIndicator.style.display = isLoading ? 'block' : 'none';
    listContainer.style.display = isLoading ? 'none' : 'grid';
  }

  function renderList(data, page = 1) {
    listContainer.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = data.slice(start, end);

    paginatedItems.forEach(item => {
      const listItem = document.createElement('a');
      listItem.className = 'list-item';
      listItem.href = item.link || '#';
      listItem.target = '_blank';
      listItem.rel = 'noopener noreferrer';
      listItem.innerHTML = `<div>${item.name}</div>`;
      listContainer.appendChild(listItem);
    });

    renderPagination(data.length, page);
  }

  function renderPagination(totalItems, page) {
    paginationContainer.innerHTML = '';
    totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('button');
      pageItem.innerText = i;
      pageItem.className = i === page ? 'active' : '';
      pageItem.addEventListener('click', () => {
        currentPage = i;
        renderList(filteredData, currentPage);
      });
      paginationContainer.appendChild(pageItem);
    }

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
    firstPageButton.disabled = currentPage === 1;
    lastPageButton.disabled = currentPage === totalPages;
  }

  function filterAndRender() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredData = allData.filter(item => item.name.toLowerCase().includes(searchTerm));
    renderList(filteredData, currentPage);
  }

  // Pagination controls
  searchInput.addEventListener('input', () => {
    currentPage = 1;
    filterAndRender();
  });

  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderList(filteredData, currentPage);
    }
  });

  nextPageButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderList(filteredData, currentPage);
    }
  });

  firstPageButton.addEventListener('click', () => {
    currentPage = 1;
    renderList(filteredData, currentPage);
  });

  lastPageButton.addEventListener('click', () => {
    currentPage = totalPages;
    renderList(filteredData, currentPage);
  });

  // Load from local JSON only
  async function loadChains() {
    showLoading(true);
    try {
      const res = await fetch('chains.json');
      const data = await res.json();
      allData = data;
      filteredData = allData;
      renderList(filteredData, currentPage);
    } catch (err) {
      listContainer.innerHTML = '<div class="error">Unable to load explorers.</div>';
    } finally {
      showLoading(false);
    }
  }

  loadChains();

  if (typeof initializeTranslations === 'function') {
    initializeTranslations();
  }
});
