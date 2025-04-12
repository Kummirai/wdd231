// scripts/dictionary.js
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const wordInput = document.getElementById('wordInput');
  const searchBtn = document.getElementById('searchBtn');
  const resultsDiv = document.getElementById('results');

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