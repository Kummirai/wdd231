export async function fetchWordDefinition(word) {
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!res.ok) throw new Error('Word not found');
      return await res.json();
    } catch (err) {
      showModal(`Error: ${err.message}`);
      return null;
    }
  }
