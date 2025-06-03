const fetch = require('node-fetch');

async function getJoke() {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const jokeData = await response.json();

    if (!jokeData || !jokeData.joke) {
      throw new Error('Invalid joke data received from API');
    }

    console.log(`::set-output name=joke-output::${jokeData.joke}`);
  } catch (error) {
    console.error(`Error fetching joke: ${error.message}`);
    console.log('::set-output name=joke-output::No joke available due to an error.');
  }
}

getJoke();
