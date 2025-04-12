// scripts/dictionary.js
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const wordInput = document.getElementById('wordInput');
  const searchBtn = document.getElementById('searchBtn');
  const resultsDiv = document.getElementById('results');

  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const closeSidebar = document.querySelector('.close-sidebar');
  const container = document.querySelector('.container');
  const favoritesList = document.getElementById('favorites-list');
  const historyList = document.getElementById('history-list');

  // Track search history
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

  // Toggle sidebar
  hamburger.addEventListener('click', () => {
    sidebar.classList.add('open');
    container.classList.add('sidebar-open');
  });

  closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('open');
    container.classList.remove('sidebar-open');
  });

  // Function to update sidebar lists
  function updateSidebarLists() {
    // Update favorites list
    const favorites = JSON.parse(localStorage.getItem('favoriteWords')) || [];
    favoritesList.innerHTML = favorites.map(word =>
      `<li data-word="${word}">${word} <span class="remove-favorite" data-word="${word}">×</span></li>`
    ).join('');

    // Update history list
    historyList.innerHTML = searchHistory.map(word =>
      `<li data-word="${word}">${word}</li>`
    ).join('');

    // Add event listeners to history items
    document.querySelectorAll('#history-list li').forEach(item => {
      item.addEventListener('click', async (e) => {
        const word = e.currentTarget.dataset.word;
        wordInput.value = word;
        const wordData = await fetchWordDefinition(word);
        if (wordData) {
          displayResults(wordData);
        }
        sidebar.classList.remove('open');
        container.classList.remove('sidebar-open');
      });
    });

    // Add event listeners to remove favorite buttons
    document.querySelectorAll('.remove-favorite').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = btn.dataset.word;
        let favorites = JSON.parse(localStorage.getItem('favoriteWords'));
        favorites = favorites.filter(fav => fav !== word);
        localStorage.setItem('favoriteWords', JSON.stringify(favorites));
        updateSidebarLists();

        // Update favorite button in main view if this word is displayed
        const favoriteBtn = document.querySelector(`.favorite-btn[data-word="${word}"]`);
        if (favoriteBtn) {
          favoriteBtn.classList.remove('favorited');
          favoriteBtn.innerHTML = '☆';
        }
      });
    });
  }

  // Update the search history when a new search is performed
  async function performSearch(word) {
    if (!searchHistory.includes(word.toLowerCase())) {
      searchHistory.unshift(word.toLowerCase());
      // Keep only the last 10 searches
      if (searchHistory.length > 10) {
        searchHistory.pop();
      }
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
    updateSidebarLists();
    return await fetchWordDefinition(word);
  }

  // Modify your existing search button event listener to use performSearch
  searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const word = wordInput.value.trim();

    if (!word) {
      showModal('Please enter a word to search');
      return;
    }

    const wordData = await performSearch(word);
    if (wordData) {
      displayResults(wordData);
    }
  });

  // Dictionary API (Free Dictionary API)
  const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <div id="modal-message"></div>
    </div>
  `;
  document.body.appendChild(modal);

  // Modal functionality
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
  window.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });

  // Check if favorites exist in local storage, if not initialize
  if (!localStorage.getItem('favoriteWords')) {
    localStorage.setItem('favoriteWords', JSON.stringify([]));
  }

  // Function to fetch word definition
  async function fetchWordDefinition(word) {
    try {
      const response = await fetch(`${API_URL}${word}`);
      if (!response.ok) {
        throw new Error('Word not found');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      showModal(`Error: ${error.message}`);
      return null;
    }
  }

  // Function to display results
  function displayResults(wordData) {
    if (!wordData || wordData.length === 0) {
      resultsDiv.innerHTML = '<p>No definitions found for this word.</p>';
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
        </div>
    `;

    // Phonetics
    if (entry.phonetics && entry.phonetics.length > 0) {
      const phonetic = entry.phonetics.find(p => p.text) || entry.phonetics[0];
      html += `<p class="phonetic">${phonetic.text || ''}</p>`;

      if (phonetic.audio) {
        html += `<audio controls src="${phonetic.audio}">Your browser does not support the audio element.</audio>`;
      }
    }

    // Meanings
    entry.meanings.forEach(meaning => {
      html += `
        <div class="meaning">
          <h3>${meaning.partOfSpeech}</h3>
          <ul>
      `;

      meaning.definitions.slice(0, 5).forEach(def => {
        html += `<li>${def.definition}</li>`;
        if (def.example) {
          html += `<p class="example">Example: ${def.example}</p>`;
        }
      });

      html += `
          </ul>
        </div>
      `;
    });

    html += `</div>`;
    resultsDiv.innerHTML = html;

    // Add event listeners to favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.addEventListener('click', toggleFavorite);
    });
  }

  // Function to toggle favorite status
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

  // Event listener for search button
  searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const word = wordInput.value.trim();

    if (!word) {
      showModal('Please enter a word to search');
      return;
    }

    const wordData = await fetchWordDefinition(word);
    if (wordData) {
      displayResults(wordData);
    }
  });

  // Optional: Allow search on Enter key
  wordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
});