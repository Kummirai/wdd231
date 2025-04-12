import { fetchWordDefinition } from './api.js';

document.addEventListener('DOMContentLoaded', function () {
  const wordInput = document.getElementById('wordInput');
  const searchBtn = document.getElementById('searchBtn');
  const resultsDiv = document.getElementById('results');

  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const closeSidebar = document.querySelector('.close-sidebar');
  const container = document.querySelector('.container');
  const favoritesList = document.getElementById('favorites-list');
  const historyList = document.getElementById('history-list');

  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

  // Sidebar toggling
  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    container.classList.add('sidebar-open');
  });

  closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('open');
    container.classList.remove('sidebar-open');
  });

  function updateSidebarLists() {
    const favorites = JSON.parse(localStorage.getItem('favoriteWords')) || [];
    favoritesList.innerHTML = favorites.map(word =>
      `<li data-word="${word}">${word} <span class="remove-favorite" data-word="${word}">×</span></li>`
    ).join('');

    historyList.innerHTML = searchHistory.map(word =>
      `<li data-word="${word}">${word}</li>`
    ).join('');

    // History click
    document.querySelectorAll('#history-list li').forEach(item => {
      item.addEventListener('click', async (e) => {
        const word = e.currentTarget.dataset.word;
        wordInput.value = word;
        const wordData = await fetchWordDefinition(word);
        if (wordData) displayResults(wordData);
        sidebar.classList.remove('open');
        container.classList.remove('sidebar-open');
      });
    });

    // Remove favorite
    document.querySelectorAll('.remove-favorite').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = btn.dataset.word;
        let favorites = JSON.parse(localStorage.getItem('favoriteWords'));
        favorites = favorites.filter(fav => fav !== word);
        localStorage.setItem('favoriteWords', JSON.stringify(favorites));
        updateSidebarLists();
      });
    });
  }

  async function performSearch(word) {
    if (!searchHistory.includes(word.toLowerCase())) {
      searchHistory.unshift(word.toLowerCase());
      if (searchHistory.length > 10) searchHistory.pop();
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
    updateSidebarLists();
    return await fetchWordDefinition(word);
  }

  // Search
  document.getElementById('dictionaryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const word = wordInput.value.trim();
    if (!word) return showModal('Please enter a word to search');
    const wordData = await performSearch(word);
    if (wordData) displayResults(wordData);
  });

  // Modal
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <div id="modal-message"></div>
    </div>`;
  document.body.appendChild(modal);

  const closeModal = modal.querySelector('.close-modal');
  const modalMessage = modal.querySelector('#modal-message');

  function showModal(message) {
    modalMessage.innerHTML = message;
    modal.style.display = 'block';
  }

  function hideModal() {
    modal.style.display = 'none';
  }

  closeModal.addEventListener('click', hideModal);
  window.addEventListener('click', e => {
    if (e.target === modal) hideModal();
  });

  if (!localStorage.getItem('favoriteWords')) {
    localStorage.setItem('favoriteWords', JSON.stringify([]));
  }

  function displayResults(wordData) {
    if (!wordData || wordData.length === 0) {
      resultsDiv.innerHTML = '<p>No definitions found.</p>';
      return;
    }

    const entry = wordData[0];
    const favorites = JSON.parse(localStorage.getItem('favoriteWords'));
    const isFavorite = favorites.includes(entry.word.toLowerCase());

    let html = `
      <div class="word-card">
        <div class="word-header">
          <h2>${entry.word}</h2>
          <button class="favorite-btn ${isFavorite ? 'favorited' : ''}" data-word="${entry.word}">
            ${isFavorite ? '★' : '☆'}
          </button>
        </div>`;

    if (entry.phonetics.length > 0) {
      const phonetic = entry.phonetics.find(p => p.text) || entry.phonetics[0];
      html += `<p class="phonetic">${phonetic.text || ''}</p>`;
      if (phonetic.audio) {
        html += `<audio controls src="${phonetic.audio}">Audio not supported</audio>`;
      }
    }

    entry.meanings.forEach(meaning => {
      html += `<div class="meaning"><h3>${meaning.partOfSpeech}</h3><ul>`;
      meaning.definitions.slice(0, 5).forEach(def => {
        html += `<li>${def.definition}</li>`;
        if (def.example) html += `<p class="example">Example: ${def.example}</p>`;
      });
      html += `</ul></div>`;
    });

    html += `</div>`;
    resultsDiv.innerHTML = html;

    document.querySelector('.favorite-btn').addEventListener('click', toggleFavorite);
  }

  function toggleFavorite(e) {
    const word = e.target.dataset.word.toLowerCase();
    let favorites = JSON.parse(localStorage.getItem('favoriteWords'));

    if (favorites.includes(word)) {
      favorites = favorites.filter(fav => fav !== word);
      e.target.classList.remove('favorited');
      e.target.innerHTML = '☆';
      showModal(`Removed "${word}" from favorites`);
    } else {
      favorites.push(word);
      e.target.classList.add('favorited');
      e.target.innerHTML = '★';
      showModal(`Added "${word}" to favorites`);
    }

    localStorage.setItem('favoriteWords', JSON.stringify(favorites));
  }

  // Optional: enter key triggers search
  wordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
  });
});
