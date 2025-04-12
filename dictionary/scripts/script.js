const search = document.getElementById('searchBtn');

search.addEventListener('click', (event) => {
  event.preventDefault();
  const word = document.getElementById('wordInput').value;
  if (word) {
    console.log(word)
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Word not found');
        }
        return response.json();
      })
      .then(data => {
        displayResult(data);
        console.log(data)
      })
      .catch(error => {
        document.getElementById('result').innerHTML = `<div class="alert alert-danger" role="alert">${error.message}</div>`;
      });
  } else {
    alert('Please enter a word');
  }
});

function displayResult(data) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  data.forEach(entry => {
    const word = entry.word;
    const meanings = entry.meanings.map(meaning => {
      return `<li>${meaning.partOfSpeech}: ${meaning.definitions[0].definition}</li>`;
    }).join('');

    resultDiv.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${word}</h5>
                    <ul>${meanings}</ul>
                </div>
            </div>
        `;
  });
}